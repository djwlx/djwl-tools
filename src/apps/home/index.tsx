import CardList, { CardConfig } from '@/components/CardList';
import { Box } from '@chakra-ui/react';
import pdfSvg from '@/assets/pdf.svg';
import lockSvg from '@/assets/lock.svg';
import seSvg from '@/assets/setu.svg';

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
    {
      name: '随机涩图',
      link: '/randow-setu',
      imgUrl: seSvg,
    },
  ];

  return (
    <Box>
      <CardList configList={moduleList} />
    </Box>
  );
};
export default Home;
