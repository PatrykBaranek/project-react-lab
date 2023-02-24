import { useNavigate, useParams } from 'react-router-dom';
import { IPost } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';
import { Comments } from '../Comments/Comments';

import './PostDetails.css';
import { Loading } from '../../Common/components/Loading/Loading';
import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { selectAuth } from '../../app/Auth/authSlice';

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

  const { data: post, isLoading } = useFetch<IPost>(
    'https://jsonplaceholder.typicode.com/posts/' + postId
  );

  if (isLoading) return <Loading />;

  return (
    <div className={`post-details-container ${mode}`}>
      <div className="post-title">
        <h3>{post?.title}</h3>
      </div>
      <div className="post-body">
        <p>{post?.body}</p>
      </div>
      <br />
      <Comments postId={Number(postId)} />
    </div>
  );
};
