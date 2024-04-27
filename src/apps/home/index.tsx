import CardList, { CardConfig } from '@/components/CardList';
import { Box } from '@chakra-ui/react';
import svgPath from '@/assets/pdf.svg';

const Home = () => {
  const moduleList: CardConfig[] = [
    {
      name: 'PDF转图片',
      link: '/pdf-to-img',
      imgUrl: svgPath,
    },
  ];

  return (
    <Box>
      <CardList configList={moduleList} />
    </Box>
  );
};
export default Home;
