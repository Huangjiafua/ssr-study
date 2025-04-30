import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { loader as homeLoader } from './pages/Home';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    loader: homeLoader,
  },
  {
    path: '/about',
    element: <About />,
  },
]; 