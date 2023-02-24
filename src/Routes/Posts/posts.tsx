import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../Common/components/Loading/Loading';
import { IPost, IUser } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';
import './Posts.css';
import { CreateNewPostForm } from '../../Common/components/CreateNewPostForm/CreateNewPostForm';
import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { selectAuth } from '../../app/Auth/authSlice';

export interface IUsernames {
  userId: number;
  username: string;
  postId: number;
}

export const Posts: React.FC = () => {
  const user = useAppSelector(selectAuth);
  const mode = useAppSelector(selectThemeMode);
  const {
    data: postsFetch,
    error,
    isLoading,
  } = useFetch<IPost[]>('https://jsonplaceholder.typicode.com/posts');
  const { data: usersFetch } = useFetch<IUser[]>('https://jsonplaceholder.typicode.com/users');
  const [usernames, setUserNames] = useState<IUsernames[]>([]);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [openCreateNewPostForm, setOpenCreateNewPostForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login');
    }
    if (usersFetch !== undefined && postsFetch !== undefined) {
      const usernames = usersFetch?.map((user) => {
        return {
          userId: user.id,
          username: user.name,
          postId: postsFetch?.find((post) => post.userId === user.id)?.id as number,
        };
      });
      setUserNames(usernames);
      setPosts(postsFetch);
    }
  }, [postsFetch, usersFetch, user, navigate]);

  const handleClick = (postId: number) => {
    navigate(`${postId}`);
  };

  const handleAddNewPost = (newPost: IPost) => {
    newPost.id = posts[posts.length - 1].id + 1;
    setPosts([...posts, newPost]);
  };

  const handleOpenForm = () => {
    setOpenCreateNewPostForm(true);
  };

  const handleCloseForm = () => {
    setOpenCreateNewPostForm(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <div className="error">{error}</div>}
      <div className={`posts-container ${mode}`}>
        <h2>Posts</h2>
        <div className="create-post-container">
          <CreateNewPostForm
            isOpen={openCreateNewPostForm}
            handleCloseForm={handleCloseForm}
            handleAddNewPost={handleAddNewPost}
          />
          <button className="create-new-post-btn" onClick={handleOpenForm}>
            Create Post
          </button>
        </div>
        {posts.map((post) => (
          <div
            className="post"
            key={post.id}
            onClick={() => handleClick(post.id)}
            title="Click to see details"
          >
            <div className="post-title">
              <p>{post.title}</p>
            </div>
            <div className="post-body">
              <p>
                {post.body.length > 50
                  ? post.body.slice(40, post.body.length - 1) + '...'
                  : post.body}
              </p>
            </div>
            <div className="post-createdBy">
              <p>{usernames?.find((username) => username.userId === post.userId)?.username}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
