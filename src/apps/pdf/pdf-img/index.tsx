import { Upload, UploadFile } from '@/components/Upload';
import React, { FC, useEffect, useState } from 'react';
import { Alert, AlertIcon, Image, Button, Center, Progress, Tag, Box } from '@chakra-ui/react';
import pdfSvg from '@/assets/pdf2.svg';
import { pdfToImg } from '@/services';
import { clickDownload } from '@/utils/file';

const PdfToImg: FC = () => {
  const [originFile, setOriginFile] = useState<UploadFile<any>>();
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState('');
  const [status, setStatus] = useState('');
  const [download, setDownload] = useState('');

  const onSuccess = (body: any) => {
    if (body.code === 0) {
      setStatus('successful');
      const fileId = body.data?.id;
      setFileId(fileId);
    }
  };

  const getTagStatus = () => {
    switch (status) {
      case 'uploading':
        return '上传中';
      case 'successful':
        return '上传成功';
      case 'conversion':
        return '转化中';
      case 'done':
        return '已完成';
      default:
        return '上传中';
    }
  };

  useEffect(() => {
    // 上传完成，开始转化
    if (fileId) {
      setStatus('conversion');
      pdfToImg(fileId).then(res => {
        if (res.data?.code === 0) {
          setDownload(res.data?.data?.fileId);
          setStatus('done');
        }
      });
    }
  }, [fileId]);

  return (
    <Center flexDir={'column'}>
      <Alert status="warning" marginBottom={'16px'}>
        <AlertIcon />
        转化时间较长，请耐心等待！
      </Alert>
      {originFile && (
        <>
          <Image src={pdfSvg} alt="Dan Abramov" />
          <Box display={'flex'} gap={'10px'}>
            <Tag>{getTagStatus()}</Tag>
            <div>{originFile?.name}</div>
          </Box>
        </>
      )}

      <Progress value={progress} />

      <Upload
        accept=".pdf"
        beforeUpload={file => {
          setOriginFile(file);
          setProgress(0);
          setFileId('');
          setDownload('');
          setStatus('uploading');
          return file;
        }}
        onProgress={e => {
          setProgress(e.percent as number);
        }}
        onSuccess={onSuccess}
      >
        <Button colorScheme="teal">选择pdf文件上传</Button>
      </Upload>
      {download && (
        <Button
          colorScheme="teal"
          mt="10px"
          onClick={() => {
            clickDownload(`/api/file/get/${download}`);
          }}
        >
          点击下载图片压缩包
        </Button>
      )}
    </Center>
  );
};
export default PdfToImg;
