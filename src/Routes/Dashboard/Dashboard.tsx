import { FC, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Account/AccountContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: FC = () => {
	const { state: userContext } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!userContext.isAuthenticated) {
			navigate('/login');
		}
	}, [navigate, userContext]);

	return (
		<div className="dashboard-container">
			<div className="user-info-container">
				<h3 className="user-name">{userContext.login?.username}</h3>
			</div>
			<div className="user-posts-container"></div>
			<div className="user-albums-conatiner"></div>
		</div>
	);
};
