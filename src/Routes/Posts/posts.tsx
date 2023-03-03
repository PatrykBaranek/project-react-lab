import { useState } from 'react';

import './Posts.css';

import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { Loading } from '../../components/Loading/Loading';
import { CreateNewPostForm } from '../../components/CreateNewPostForm/CreateNewPostForm';
import { PostsList } from './PostsList';
import { useGetAllPostsQuery } from '../../app/api/jsonPlaceholderApi';

export const Posts: React.FC = () => {
  const mode = useAppSelector(selectThemeMode);

  const { data: posts, isLoading } = useGetAllPostsQuery();

  const [openCreateNewPostForm, setOpenCreateNewPostForm] = useState(false);

  const handleOpenForm = () => {
    setOpenCreateNewPostForm(true);
  };

  const handleCloseForm = () => {
    setOpenCreateNewPostForm(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`posts-container ${mode}`}>
      <h2>Posts</h2>
      <div className="create-post-container">
        <CreateNewPostForm isOpen={openCreateNewPostForm} handleCloseForm={handleCloseForm} />
        <button className="create-new-post-btn" onClick={handleOpenForm}>
          Create Post
        </button>
      </div>
      {posts && <PostsList posts={posts} />}
    </div>
  );
};
