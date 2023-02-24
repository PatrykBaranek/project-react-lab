import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTable } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../app/Auth/authSlice';

export const Home: FC = () => {
  const user = useAppSelector(selectAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <div className="home-container">
      <div className="page-title">
        <h1>Welcome {user.login?.username}!</h1>
      </div>

      <div className="post-album-links-container">
        <div className="album-link">
          <h3>See All Albums</h3>

          <FontAwesomeIcon icon={faImage} onClick={() => navigate('/photos')} />
        </div>

        <div className="posts-link">
          <h3>See All Posts</h3>

          <FontAwesomeIcon icon={faTable} onClick={() => navigate('/posts')} />
        </div>
      </div>
    </div>
  );
};
