import { FC, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Account/AccountContext';
import { useNavigate } from 'react-router-dom';

export const Home: FC = () => {
	const { state: user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user.isAuthenticated) {
			navigate('/login');
		}
	}, [navigate, user]);

	return (
		<>
			<p>home</p>
		</>
	);
};
