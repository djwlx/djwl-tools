import { Box, List, ListItem, Text } from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import Icon, { StarIcon } from '@chakra-ui/icons';

const AppMenu: FC = () => {
  const [menuValue, setMenuValue] = useState('main');

  const menuConfig = useMemo(() => {
    return [
      {
        key: 'main',
        title: '常用工具',
        icon: <StarIcon />,
      },
      {
        key: 'pdf',
        title: 'PDF工具',
      },
    ];
  }, []);

  return (
    <Box w="240px" boxShadow={'var(--shadow-custom)'}>
      <List spacing={1} padding={'10px'}>
        {menuConfig.map(item => {
          const isSelected = item.key === menuValue;
          return (
            <ListItem
              color={isSelected ? 'var(--main-color)' : 'var(--color-grey)'}
              cursor={'pointer'}
              bgColor={isSelected ? 'var(--main-bgc)' : undefined}
              _hover={{
                bgColor: isSelected ? undefined : 'var(--main-bg-grey)',
              }}
              borderRadius={'4px'}
              onClick={() => {
                setMenuValue(item.key);
              }}
            >
              <Box padding="10px 5px" display="flex" alignItems="center" gap="8px">
                {item.icon}
                <Text>{item.title}</Text>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
export default AppMenu;
