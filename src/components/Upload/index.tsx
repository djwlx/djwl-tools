import React, { ReactNode, useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';

interface UploadProps {
  children?: ReactNode;
  multiple?: boolean;
  accept?: string[];
  uploadTrigger?: 'custom' | 'auto';
  url: string;
}

const Upload = forwardRef((props: UploadProps, ref) => {
  const { children, multiple = false, accept, uploadTrigger = 'auto', url } = props;
  const [fileList, setFileList] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFileAsStream = useCallback(
    (file: File, progressCallback?: (progress: number) => void) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', event => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            progressCallback?.(progress);
          }
        });

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              reject(xhr.statusText);
            }
          }
        };
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });
    },
    [url],
  );

  const onFileChange = (e: any) => {
    const files = e.target.files;
    if (uploadTrigger === 'auto') {
      onFileUpload(files);
    }
    setFileList(files);
  };

  const onFileUpload = async (files?: File[]) => {
    // 上传文件
    const uploadFiles = files || fileList;
    const uploadResult = await Promise.all(uploadFiles.map(item => uploadFileAsStream(item)));
    console.log(uploadResult, '上传成功');
  };

  const onSelectFile = (e: any) => {
    fileInputRef.current?.click();
    e.stopPropagation();
  };

  useImperativeHandle(ref, () => {
    return {
      upload: onFileUpload,
    };
  });

  return (
    <div>
      <input
        style={{ visibility: 'hidden', position: 'absolute', height: 0 }}
        ref={fileInputRef}
        type="file"
        onChange={onFileChange}
        multiple={multiple}
        accept={accept ? accept.join(',') : undefined}
      />
      <div onClick={onSelectFile}>{children ? children : <button>点击上传</button>}</div>
    </div>
  );
});
export default Upload;
