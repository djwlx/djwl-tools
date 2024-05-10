import { Box, List, ListItem, Card, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface CardConfig {
  name: string;
  link: string;
  imgUrl: string;
}

export interface CardListProps {
  configList: CardConfig[];
}
const CardList = (props: CardListProps) => {
  const { configList = [] } = props;

  const navigate = useNavigate();

  return (
    <Box borderRadius={'4px'} height={'400px'}>
      <List display={'flex'} gap={'16px'}>
        {configList.map(item => {
          return (
            <ListItem key={item.link}>
              <Card
                w={'150px'}
                padding={'10px'}
                textAlign={'center'}
                cursor={'pointer'}
                onClick={() => {
                  navigate(item.link);
                }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={'6px'}
                _hover={{
                  bgColor: 'var(--main-bgc)',
                }}
                transition={'var(--transition-bg)'}
              >
                <Image w={100} h={100} src={item.imgUrl} alt="pdf" borderRadius="lg" />
                <Text>{item.name}</Text>
              </Card>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
export default CardList;
