import globalConfig from '@/constants/config';
import React, { ReactNode, useState, useRef, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react';
import { FileStatus } from './types';

export interface UploadProps {
  children?: ReactNode;
  multiple?: boolean;
  accept?: string[];
  uploadTrigger?: 'custom' | 'auto';
  url?: string;
  fileList?: CustomFile[];
  onChange?: (fileList: CustomFile[]) => void;
}

export interface CustomFile {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
}

const Upload = forwardRef((props: UploadProps, ref) => {
  const {
    children,
    multiple = false,
    accept,
    uploadTrigger = 'auto',
    url = '/api/util/upload',
    fileList: propsFileList,
    onChange,
  } = props;
  const [fileList, setFileList] = useState<CustomFile[]>(propsFileList || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFileAsStream = useCallback(
    (paramFile: CustomFile, progressCallback?: (progress: number) => void) => {
      const file = paramFile.file;
      const encodedName = encodeURIComponent(file.name);
      const fileContent = {
        name: encodedName,
        type: file.type,
        size: file.size,
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
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(xhr.statusText);
            }
          }
        };
        xhr.open('POST', uploadUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.setRequestHeader('file-content', JSON.stringify(fileContent));
        xhr.send(file);
      });
    },
    [url],
  );

  const onFileChange = (e: any) => {
    const files = e.target.files;
    const fileArray = Array.from<File>(files).map(item => {
      return {
        file: item,
        id: item.name,
        progress: 0,
        status: FileStatus.ready,
      };
    });

    if (uploadTrigger === 'auto') {
      onFileUpload(fileArray);
    }
    setFileList(fileArray);
  };

  const onFileUpload = async (files?: CustomFile[]) => {
    const uploadFiles = files || fileList;
    const uploadResult = await Promise.all(
      uploadFiles.map(item =>
        uploadFileAsStream(item, progress => {
          console.log(progress, 'progress');
        }),
      ),
    );
    console.log(uploadResult, 'resulttt');
  };

  const onSelectFile = (e: any) => {
    fileInputRef.current?.click();
    e.stopPropagation();
  };

  useImperativeHandle(ref, () => {
    return {
      upload: onFileUpload,
      fileList,
    };
  });

  useEffect(() => {
    onChange?.(fileList);
  }, [fileList, onChange]);

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
