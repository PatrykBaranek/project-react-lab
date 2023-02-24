import { useState } from 'react';

import './Posts.css';

import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { Loading } from '../../components/Loading/Loading';
import { CreateNewPostForm } from '../../components/CreateNewPostForm/CreateNewPostForm';
import { selectPosts, selectPostsError, selectPostsStatus } from '../../app/Posts/postsSlice';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { PostsList } from './PostsList';

export const Posts: React.FC = () => {
  const mode = useAppSelector(selectThemeMode);

  const posts = useAppSelector(selectPosts);
  const postsStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);

  const [openCreateNewPostForm, setOpenCreateNewPostForm] = useState(false);

  const handleOpenForm = () => {
    setOpenCreateNewPostForm(true);
  };

  const handleCloseForm = () => {
    setOpenCreateNewPostForm(false);
  };

  if (postsStatus === 'pending') {
    return <Loading />;
  }

  if (postsStatus === 'failed') {
    return <ErrorPage errorMessage={postsError} />;
  }

  return (
    <>
      <div className={`posts-container ${mode}`}>
        <h2>Posts</h2>
        <div className="create-post-container">
          <CreateNewPostForm isOpen={openCreateNewPostForm} handleCloseForm={handleCloseForm} />
          <button className="create-new-post-btn" onClick={handleOpenForm}>
            Create Post
          </button>
        </div>
        <PostsList posts={posts} />
      </div>
    </>
  );
};
