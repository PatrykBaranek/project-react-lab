import { FC, useContext } from 'react';
import './UserDetails.css';
import { AuthContext } from '../../context/Account/AccountContext';

const UserDetails: FC = () => {
	const { state: user } = useContext(AuthContext);

	return <div>{user.user?.username}</div>;
};
