import globalConfig from '@/constants/config';
import React, { ReactNode, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { FileStatus } from './types';
import { v4 as uuidv4 } from 'uuid';

export interface UploadProps {
  fileList: CustomFile[];
  children?: ReactNode;
  multiple?: boolean;
  accept?: string[];
  uploadTrigger?: 'custom' | 'auto';
  url?: string;
  onChange?: (fileList: CustomFile[]) => void;
  onFileChange?: (fileList: CustomFile[]) => void;
}

export interface CustomFile {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
  res?: any;
  password?: string;
}

const Upload = forwardRef((props: UploadProps, ref) => {
  const {
    children,
    multiple = false,
    accept,
    uploadTrigger = 'auto',
    url = '/api/util/upload',
    fileList,
    onChange,
    onFileChange: onPropsFileChange,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFileAsStream = useCallback(
    (
      paramFile: CustomFile,
      progressCallback?: (progress: number) => void,
      resCallback?: (res: { status: FileStatus; res?: any }) => void,
    ) => {
      const file = paramFile.file;
      const encodedName = encodeURIComponent(file.name);
      const fileContent = {
        name: encodedName,
        type: file.type,
        size: file.size,
        password: paramFile.password,
      };

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const uploadUrl = `${globalConfig.serverHost}${url}`;

        xhr.upload.addEventListener('progress', event => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            progressCallback?.(progress);
          }
        });

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            const res = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
              resCallback?.({ status: FileStatus.success, res });
              resolve(res);
            } else {
              resCallback?.({ status: FileStatus.error, res });
              reject(xhr.statusText);
            }
          }
        };
        xhr.open('POST', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.setRequestHeader('file-content', JSON.stringify(fileContent));
        xhr.send(file);
        resCallback?.({ status: FileStatus.uploading });
      });
    },
    [url],
  );

  const onFileChange = (e: any) => {
    const files = e.target.files;
    const fileArray = Array.from<File>(files).map(item => {
      return {
        file: item,
        id: uuidv4(),
        progress: 0,
        status: FileStatus.ready,
      };
    });

    const newFileList = multiple ? (fileList?.length !== 0 ? fileList.concat(fileArray) : fileArray) : fileArray;

    onChange?.(newFileList);
    onPropsFileChange?.(newFileList);

    if (uploadTrigger === 'auto') {
      onFileUpload(newFileList);
    }
  };

  const onFileUpload = async (files?: CustomFile[]) => {
    const uploadFiles = files || fileList;

    const filePromise = uploadFiles.map(item =>
      uploadFileAsStream(
        item,
        progress => {
          // 更新进度
          onChange?.((fileList =>
            fileList.map(fileItem => {
              if (fileItem.id === item.id) {
                return {
                  ...fileItem,
                  progress,
                };
              } else {
                return fileItem;
              }
            })) as any);
        },
        res => {
          onChange?.((fileList =>
            fileList.map(fileItem => {
              if (fileItem.id === item.id) {
                return {
                  ...fileItem,
                  status: res.status,
                  res: res.res,
                };
              } else {
                return fileItem;
              }
            })) as any);
        },
      ),
    );
    Promise.all(filePromise);
  };

  const onSelectFile = (e: any) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current?.click();
    }
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
