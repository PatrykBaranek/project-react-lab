import { useNavigate, useParams } from 'react-router-dom';
import { Comments } from '../Comments/Comments';

import './PostDetails.css';

import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { selectAuth } from '../../app/Auth/authSlice';
import { selectPostById } from '../../app/Posts/postsSlice';

export interface IPostDetailsProps {
  postId: number;
  title: string;
  body: string;
  userId: number;
}

export const PostDetails: React.FC = () => {
  const mode = useAppSelector(selectThemeMode);
  const user = useAppSelector(selectAuth);
  const { id: postId } = useParams();

  const navigate = useNavigate();
  if (!user.isAuthenticated) {
    navigate('/login');
  }

  const post = useAppSelector((state) => selectPostById(state, postId as string));

  return (
    <div className={`post-details-container ${mode}`}>
      <div className="post-title">
        <h3>{post?.title}</h3>
      </div>
      <div className="post-body">
        <p>{post?.body}</p>
      </div>
      <br />
      <Comments postId={postId as string} />
    </div>
  );
};
