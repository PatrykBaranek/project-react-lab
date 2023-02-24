import { Outlet } from 'react-router-dom';
import { Nav } from '../../Routes/Nav/Nav';

export const Layout: React.FC = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
