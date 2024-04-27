import { createBrowserRouter } from 'react-router-dom';
import Home from '@/apps/home';
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <Home /> }],
  },
]);

export default router;
