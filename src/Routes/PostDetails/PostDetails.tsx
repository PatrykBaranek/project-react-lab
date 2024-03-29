import { useParams } from 'react-router-dom';
import { Comments } from '../Comments/Comments';

import './PostDetails.css';

import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { useGetPostByIdQuery } from '../../app/api/jsonPlaceholderApi';
import { Loading } from '../../components/Loading/Loading';

export interface IPostDetailsProps {
  postId: number;
  title: string;
  body: string;
  userId: number;
}

export const PostDetails: React.FC = () => {
  const mode = useAppSelector(selectThemeMode);
  const { id: postId } = useParams();

  const { data: post, isLoading } = useGetPostByIdQuery(Number(postId));

  if (isLoading) {
    return <Loading />;
  }

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
