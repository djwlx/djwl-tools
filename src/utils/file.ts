import globalConfig from '@/constants/config';

// 点击下载
export const clickDownload = (url: string) => {
  const link = document.createElement('a');
  link.href = `${globalConfig.serverHost}${url}`;
  link.download = ''; // 设置 download 属性为空字符串，以便文件名从服务器上获取
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
