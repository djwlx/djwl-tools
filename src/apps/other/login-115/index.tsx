import CopyText from '@/components/CopyText';
import { get115QrCode, get115Token } from '@/services';
import { Button, Center, Image, useToast } from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';

const LoginToken115: FC = () => {
  const [dataUrl, setDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusData, setStatusData] = useState<any>();
  const [token, setToken] = useState('');
  const toast = useToast();

  const getQrCode = () => {
    setIsLoading(true);
    get115Token(statusData)
      .then(res => {
        const { data } = res.data;
        if (data.data?.status === 2) {
          toast({
            title: 'Successful',
            description: '获取成功，复制后使用',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
          setToken(statusData?.uid);
        } else {
          toast({
            title: 'Error',
            description: '获取token失败,请重新扫码重试',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
          getQR();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getQR = () => {
    setDataUrl('');
    setStatusData(undefined);
    setToken('');
    get115QrCode().then(res => {
      const { url, qrValue } = res.data?.data || {};
      setDataUrl(url);
      setStatusData(qrValue);
    });
  };

  useEffect(() => {
    getQR();
  }, []);

  return (
    <Center flexDirection={'column'}>
      <Image src={dataUrl} height={'300px'}></Image>
      <Button onClick={getQrCode} isLoading={isLoading}>
        扫码成功后，点击获取token
      </Button>
      {token && <CopyText text={token} style={{ marginTop: 15 }} />}
    </Center>
  );
};
export default LoginToken115;
