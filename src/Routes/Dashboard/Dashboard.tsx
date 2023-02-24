import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../app/Auth/authSlice';

export const Dashboard: React.FC = () => {
  const user = useAppSelector(selectAuth);

  return (
    <div className="dashboard-container">
      <div className="user-info-container">
        <h3 className="user-name">{user.login?.username}</h3>
      </div>
      <div className="user-posts-container"></div>
      <div className="user-albums-conatiner"></div>
    </div>
  );
};
