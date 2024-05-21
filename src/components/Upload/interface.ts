import { CSSProperties, ReactNode } from 'react';

// 组件相关
// export type UploadFileStatus = 'error' | 'done' | 'uploading' | 'removed';

export interface UploadFile<T = any> {
  uid: string;
  originFile: File;
  name: string;
  size?: number;
  response?: T;
  // status?: UploadFileStatus;
  [s: string]: any;
}

export interface UploadProps<T = any> {
  action?: string;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  multiple?: boolean;
  accept?: string;
  fileName?: string;
  beforeUpload?: (file: UploadFile) => Promise<UploadFile> | UploadFile;
  onError?: (error: ProgressEvent<EventTarget> | Error, body?: T) => void;
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
  onProgress?: (event: UploadProgressEvent) => void;
}

// 请求相关
export interface RequestOption<T = any> {
  action: string;
  method: 'POST' | 'PUT' | 'PATCH';
  file?: File;
  fileName?: string;
  headers?: Record<string, string>;
  onError?: (error: ProgressEvent<EventTarget> | Error, body?: T) => void;
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
  onProgress?: (event: UploadProgressEvent) => void;
}

export interface UploadProgressEvent extends ProgressEvent<EventTarget> {
  percent?: number;
}
