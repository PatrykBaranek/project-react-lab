import { FC, useContext } from 'react';
import { AuthContext } from '../../context/Account/AccountContext';
import { useNavigate } from 'react-router-dom';

const Home: FC = () => {
	const { state: user } = useContext(AuthContext);
	const navigate = useNavigate();

	if (!user.isAuthenticated) {
		navigate('/login');
	}

	return (
		<>
			<p>home</p>
		</>
	);
};

export default Home;
