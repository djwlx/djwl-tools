import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Drawer,
  IconButton,
  useDisclosure,
  Text,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import AppMenu from '@/components/AppMenu';
import { HamburgerIcon } from '@chakra-ui/icons';

const LayoutComponent: FC = () => {
  const [menuPositon, setMenuPosition] = useState('top');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const setPosition = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 640) {
        setMenuPosition('top');
      } else {
        setMenuPosition('left');
      }
    };
    setTimeout(() => {
      setPosition();
    });
    window.addEventListener('resize', setPosition);
    return () => window.removeEventListener('resize', setPosition);
  }, []);

  return (
    <Box w="100vw" h="100vh">
      <Box
        h="60px"
        w="100vw"
        boxShadow={'var(--shadow-custom)'}
        padding={'6px 16px'}
        display={'flex'}
        alignItems={'center'}
        gap={'16px'}
      >
        {menuPositon === 'top' && (
          <IconButton
            aria-label="Done"
            variant="solid"
            icon={<HamburgerIcon color={'var(--main-color)'} />}
            onClick={onOpen}
          />
        )}
        <Text fontWeight={600} fontSize={18}>
          低级亡灵工具箱
        </Text>
      </Box>
      <Box h="calc(100vh - 60px)" display="flex">
        {menuPositon === 'left' && <AppMenu />}
        <Box h="calc(100vh - 60px)" flex={1} overflow="auto" padding={'16px'}>
          <Outlet />
        </Box>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent alignItems={'center'} paddingTop={'32px'}>
          <DrawerCloseButton />
          <AppMenu border={false} onSelect={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default LayoutComponent;
