import { useRef, forwardRef, ChangeEvent, useImperativeHandle } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UploadFile, UploadProps, RequestOption } from './interface';
import uploadRequest from './request';
import globalConfig from '@/constants/config';

const Upload = forwardRef((props: UploadProps, ref) => {
  const {
    children,
    multiple = false,
    accept,
    action = '/api/file/upload',
    style,
    className,
    beforeUpload,
    fileName,
    onError,
    onProgress,
    onSuccess,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current?.click();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const fileList = Array.from(files as FileList);
    uploadFiles(fileList);
  };

  const uploadFiles = (files: File[]) => {
    const originFiles = [...files];
    const postFiles = originFiles.map(file => {
      return processFiles(file);
    });

    Promise.all(postFiles).then(fileList => {
      fileList.forEach(file => {
        postFile(file);
      });
    });
  };

  const processFiles = async (file: File): Promise<UploadFile> => {
    const initFile: UploadFile = {
      uid: uuidv4(),
      originFile: file,
      name: file.name,
      size: file.size,
    };

    let result = initFile;

    if (beforeUpload) {
      result = await beforeUpload(initFile);
    }

    return result;
  };

  const postFile = (file: UploadFile) => {
    const requestOption: RequestOption = {
      action: `${globalConfig.serverHost}${action}`,
      method: 'POST',
      fileName: fileName || 'file',
      onError,
      onProgress,
      onSuccess,
      file: file.originFile,
    };

    uploadRequest(requestOption);
  };

  useImperativeHandle(ref, () => {
    return {
      fileInputRef,
    };
  });

  return (
    <div onClick={onClick} role="button" style={{ display: 'inline-block', ...style }} className={className}>
      <input
        style={{ display: 'none' }}
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onClick={e => e.stopPropagation()}
        onChange={onChange}
      />
      {children}
    </div>
  );
});
export default Upload;
