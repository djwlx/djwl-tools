import globalConfig from '@/constants/config';
import { Box, Button, Center, Image } from '@chakra-ui/react';
import { FC, useState } from 'react';

const src =
  'https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics3.baidu.com%2Ffeed%2Fb2de9c82d158ccbffc8764fa3067b030b0354100.jpeg%40f_auto%3Ftoken%3D3eee4edf20fd1b58fd9b632dc8520f85&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1716570000&t=2cbb3a710366d1882168706b2dc6d3e3';

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
