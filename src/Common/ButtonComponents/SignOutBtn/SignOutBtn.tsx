import { useContext } from 'react';
import { AuthContext } from '../../../context/Account/AccountContext';

import signOutIcon from '../../../assets/sign-out-icon.svg';
import { ThemeContext, ThemeMode } from '../../../context/Theme/ThemeContext';

import './SignOutBtn.css';
import { useNavigate } from 'react-router-dom';

export const SignOutBtn = () => {
	const { handleLogout } = useContext(AuthContext);
	const { state: mode } = useContext(ThemeContext);
	const navigate = useNavigate();

	return (
		<div className={`sign-out-btn-container ${mode}`}>
			<img
				src={signOutIcon}
				className="sign-out-btn"
				onClick={() => {
					handleLogout();
					navigate('/login');
				}}
				alt="sign out button"
				style={{
					filter: mode === ThemeMode.dark ? 'invert(100%)' : 'invert(20%)',
				}}
			/>
		</div>
	);
};
