import { Link } from 'react-router-dom';

import './LoginBtn.css';

export const LoginBtn = () => {
	return (
		<Link to="login" className="login-btn">
			login
		</Link>
	);
};
