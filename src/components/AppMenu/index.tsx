import { Box, List, ListItem, Text } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

interface AppMenuProps {
  border?: boolean;
  onSelect?: () => void;
}
const AppMenu = (props: AppMenuProps) => {
  const { border = true, onSelect } = props;

  const [menuValue, setMenuValue] = useState('main');
  const navigate = useNavigate();

  const menuConfig = useMemo(() => {
    return [
      {
        key: 'main',
        title: '常用工具',
        icon: <StarIcon />,
        url: '/',
      },
      {
        key: 'pdf',
        title: 'PDF工具',
        url: '/',
      },
    ];
  }, []);

  return (
    <Box w="240px" boxShadow={border ? 'var(--shadow-custom)' : undefined}>
      <List spacing={1} padding={'16px 10px'}>
        {menuConfig.map(item => {
          const isSelected = item.key === menuValue;
          return (
            <ListItem
              key={item.key}
              color={isSelected ? 'var(--main-color)' : 'var(--color-grey)'}
              cursor={'pointer'}
              bgColor={isSelected ? 'var(--main-bgc)' : undefined}
              _hover={{
                bgColor: isSelected ? undefined : 'var(--main-bg-grey)',
              }}
              borderRadius={'4px'}
              onClick={() => {
                setMenuValue(item.key);
                navigate(item.url);
                onSelect?.();
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
