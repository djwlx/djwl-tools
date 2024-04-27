import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import AppMenu from '@/components/AppMenu';

const LayoutComponent: FC = () => {
  return (
    <Box w="100vw" h="100vh">
      <Box h="60px" w="100vw" boxShadow={'var(--shadow-custom)'}></Box>
      <Box h="calc(100vh - 60px)" display="flex">
        <AppMenu />
        <Box h="calc(100vh - 60px)" flex={1} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
export default LayoutComponent;
