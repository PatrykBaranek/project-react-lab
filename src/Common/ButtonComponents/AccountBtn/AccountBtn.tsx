import { FC, useContext } from 'react';
import accountIcon from '../../../assets/account-icon.svg';

import './AccountBtn.css';
import { ThemeContext, ThemeMode } from '../../../context/Theme/ThemeContext';
import { useNavigate } from 'react-router';

export const AccountBtn: FC = () => {
	const { state: mode } = useContext(ThemeContext);
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/dashboard');
	};

	return (
		<div
			className={`account-btn-container ${mode}`}
			title="Dashboard"
			onClick={handleClick}>
			<img
				className="account-btn"
				src={accountIcon}
				alt="account button"
				style={{
					filter: mode === ThemeMode.dark ? 'invert(100%)' : 'invert(20%)',
				}}
			/>
		</div>
	);
};
