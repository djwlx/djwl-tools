import globalConfig from '@/constants/config';
import { Box, Button, Center, Image } from '@chakra-ui/react';
import { FC, useState } from 'react';

const setu = `${globalConfig.serverHost}/api/util/setu`;

let index = 0;
const RandowSetu: FC = () => {
  const [imgSrc, setImgSrc] = useState(setu);

  const reload = () => {
    setImgSrc(`${setu}?key=${index++}`);
  };

  return (
    <Center flexDirection={'column'}>
      <Button mb={'20px'} onClick={reload}>
        再来一张
      </Button>
      <Box flex={1}>
        <Image w={'100vw'} src={imgSrc}></Image>
      </Box>
    </Center>
  );
};
export default RandowSetu;
