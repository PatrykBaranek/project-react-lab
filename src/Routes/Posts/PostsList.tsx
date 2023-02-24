import { useNavigate } from 'react-router-dom';
import { IPost } from '../../types/types';

interface PostListProps {
  posts: IPost[];
}

export const PostsList: React.FC<PostListProps> = ({ posts }) => {
  const navigate = useNavigate();

  const handleClick = (postId: string) => {
    navigate(`${postId}`);
  };

  return (
    <>
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
            // TODO: Add Created By User
            {/* <p>{usernames?.find((username) => username.userId === post.userId)?.username}</p> */}
          </div>
        </div>
      ))}
    </>
  );
};
