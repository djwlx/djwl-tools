import { createBrowserRouter } from 'react-router-dom';
import Home from '@/apps/home';
import Layout from './Layout';
import Page404 from '@/components/ErrorPage/404';
import PdfToImg from '@/apps/pdf/pdf-img';
import UnlockPdf from '@/apps/pdf/pdf-unlock';
import RandowSetu from '@/apps/picture/randow-setu';
import LoginToken115 from '@/apps/other/login-115';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'pdf-to-img',
        element: <PdfToImg />,
      },
      {
        path: 'pdf-unlock',
        element: <UnlockPdf />,
      },
      {
        path: 'randow-setu',
        element: <RandowSetu />,
      },
      {
        path: 'token-115',
        element: <LoginToken115 />,
      },
    ],
    ErrorBoundary: Page404,
  },
]);

export default router;
