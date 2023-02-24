import { Link } from 'react-router-dom';

import './LoginBtn.css';

export const LoginBtn: React.FC = () => {
  return (
    <Link to="login" className="login-btn" title="Log in">
      login
    </Link>
  );
};
