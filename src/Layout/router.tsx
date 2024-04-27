import { createBrowserRouter } from 'react-router-dom';
import Home from '@/apps/home';
import Layout from './Layout';
import Page404 from '@/components/ErrorPage/404';
import PdfToImg from '@/apps/pdf/pdf-img';

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
    ],
    ErrorBoundary: Page404,
  },
]);

export default router;
