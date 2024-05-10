import { createBrowserRouter } from 'react-router-dom';
import Home from '@/apps/home';
import Layout from './Layout';
import Page404 from '@/components/ErrorPage/404';
import PdfToImg from '@/apps/pdf/pdf-img';
import UnlockPdf from '@/apps/pdf/pdf-unlock';

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
    ],
    ErrorBoundary: Page404,
  },
]);

export default router;
