import { useContext } from 'react';
import accountIcon from '../../../assets/account-icon.svg';

import './AccountBtn.css';
import { ThemeContext, ThemeMode } from '../../../context/Theme/ThemeContext';

export const AccountBtn = () => {
	const { state: mode } = useContext(ThemeContext);

	return (
		<div className={`account-btn-container ${mode}`}>
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
