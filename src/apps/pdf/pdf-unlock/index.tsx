import { Upload, UploadFile } from '@/components/Upload';
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Tag,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { clickDownload } from '@/utils/file';
import { unlockPdf } from '@/services';
import pdfSvg from '@/assets/pdf2.svg';

const UnlockPdf: FC = () => {
  const [originFile, setOriginFile] = useState<UploadFile<any>>();
  const [progress, setProgress] = useState(0);
  const [fileId, setFileId] = useState('');
  const [status, setStatus] = useState('');
  const [download, setDownload] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const onSuccess = (body: any) => {
    if (body.code === 0) {
      setStatus('successful');
      const fileId = body.data?.id;
      setFileId(fileId);
    }
  };
  const onConfirm = () => {
    const password = inputRef.current?.value as string;

    setLoading(true);
    unlockPdf(fileId, password)
      .then(res => {
        if (res.data?.code === 0) {
          setDownload(res.data?.data?.fileId);
          setStatus('done');
        }
      })
      .finally(() => {
        onClose();
        setLoading(false);
      });
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
      onOpen();
    }
  }, [fileId, onOpen]);

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
          点击下载转化后的pdf
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>请输入密码</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input ref={inputRef} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onConfirm} isLoading={loading}>
              确认
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};
export default UnlockPdf;
