import { FC, useContext } from 'react';
import { ThemeMode, ThemeContext } from '../../../context/Theme/ThemeContext';

// assets
import lightDarkThemeIcon from '../../../assets/dark-mode-icon.svg';

// styles
import './ChangeModeThemeBtn.css';

export const ChangeModeThemeBtn: FC = () => {
	const { state: mode, changeTheme } = useContext(ThemeContext);

	return (
		<div
			className={`change-mode ${mode}`}
			onClick={() =>
				changeTheme(mode === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark)
			}
			title="Change theme mode">
			<img
				src={lightDarkThemeIcon}
				alt="dark/light mode"
				style={{
					filter: mode === ThemeMode.dark ? 'invert(100%)' : 'invert(20%)',
				}}
			/>
		</div>
	);
};
