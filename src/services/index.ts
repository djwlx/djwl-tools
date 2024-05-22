import request from '@/utils/request';

export const pdfToImg = (fileId: string) => {
  return request.post('/api/file/pdf-to-img', { fileId });
};
