import CardList, { CardConfig } from '@/components/CardList';
import { Box } from '@chakra-ui/react';
import pdfSvg from '@/assets/pdf.svg';
import lockSvg from '@/assets/lock.svg';

const Home = () => {
  const moduleList: CardConfig[] = [
    {
      name: 'PDF转图片',
      link: '/pdf-to-img',
      imgUrl: pdfSvg,
    },
    {
      name: 'PDF解除密码',
      link: '/pdf-unlock',
      imgUrl: lockSvg,
    },
  ];

  return (
    <Box>
      <CardList configList={moduleList} />
    </Box>
  );
};
export default Home;
