import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import customTheme from '@/constants/theme';
import '@/styles/root.css';

const ProviderApp = () => {
  const theme = extendTheme(customTheme);
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};
export default ProviderApp;
