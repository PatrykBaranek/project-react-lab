import { Outlet, useNavigate } from 'react-router-dom';
import { Nav } from '../../Routes/Nav/Nav';
import { selectAuth } from '../../app/Auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';

export const Layout: React.FC = () => {
  const user = useAppSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, user.isAuthenticated]);

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
