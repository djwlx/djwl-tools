import { RequestOption, UploadProgressEvent } from './interface';

function getError(option: RequestOption, xhr: XMLHttpRequest) {
  const { method, action } = option;
  const { status } = xhr;
  const msg = `cannot ${method} ${action} ${status}'`;
  const err = new Error(msg);
  return err;
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export const uploadRequest = (option: RequestOption) => {
  const { action, method, onError, onProgress, onSuccess, headers: paramHeaders, file, fileName } = option;

  const xhr = new XMLHttpRequest();
  const formData = new FormData();

  if (file) {
    if (fileName) {
      formData.append(fileName, file);
    } else {
      formData.append(file.name, file);
    }
  }

  if (onProgress && xhr.upload) {
    xhr.upload.onprogress = (e: UploadProgressEvent) => {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      onProgress(e);
    };
  }

  xhr.onerror = function error(e) {
    onError?.(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError?.(getError(option, xhr), getBody(xhr));
    }
    return onSuccess?.(getBody(xhr), xhr);
  };

  xhr.open(method, action, true);

  const headers = paramHeaders || {};

  Object.keys(headers).forEach(h => {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });

  xhr.send(formData);

  return {
    abort() {
      xhr.abort();
    },
  };
};

export default uploadRequest;
