import request from '@/utils/request';

export const pdfToImg = (fileId: string) => {
  return request.post('/api/file/pdf-to-img', { fileId });
};

export const unlockPdf = (fileId: string, password: string) => {
  return request.post('/api/file/unlock-pdf', { fileId, password });
};

export const get115QrCode = () => {
  return request.get('/api/util/get-115-qrcode');
};

export const get115Token = (data: any) => {
  return request.post('/api/util/get-115-token', data);
};
