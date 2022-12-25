import { FC, useContext } from 'react';
import { ThemeMode, ThemeContext } from '../../context/Theme/ThemeContext';

// assets
import lightDarkThemeIcon from '../../assets/dark-mode-icon.svg';

// styles
import './ChangeModeTheme.css';

export const ChangeModeTheme: FC = () => {
	const { state: mode, changeTheme } = useContext(ThemeContext);

	console.log(mode);

	return (
		<div
			className={`change-mode ${mode}`}
			onClick={() =>
				changeTheme(mode === ThemeMode.dark ? ThemeMode.light : ThemeMode.dark)
			}
			placeholder="change theme mode">
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
