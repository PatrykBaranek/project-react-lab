import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/Theme/ThemeContext';
import { ChangeModeThemeBtn } from '../../Common/ButtonComponents/ChangeModeThemeBtn/ChangeModeThemeBtn';
import { AuthContext } from '../../context/Account/AccountContext';

import { AccountBtn } from '../../Common/ButtonComponents/AccountBtn/AccountBtn';
import { SignOutBtn } from '../../Common/ButtonComponents/SignOutBtn/SignOutBtn';

import './Nav.css';
import { LoginBtn } from '../../Common/ButtonComponents/LoginBtn/LoginBtn';

const Nav: FC = () => {
	const { state: mode } = useContext(ThemeContext);
	const { state: user } = useContext(AuthContext);

	let activeClassname = 'activeLink';

	return (
		<nav className={`navigation ${mode}`}>
			<ChangeModeThemeBtn />
			{!user.isAuthenticated && <LoginBtn />}

			{user.isAuthenticated && (
				<>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? activeClassname : undefined
						}
						end>
						Home
					</NavLink>
					<NavLink
						to="posts"
						className={({ isActive }) =>
							isActive ? activeClassname : undefined
						}>
						Posts
					</NavLink>
					<NavLink
						to="photos"
						className={({ isActive }) =>
							isActive ? activeClassname : undefined
						}>
						Photos
					</NavLink>
					<NavLink
						to="users"
						className={({ isActive }) =>
							isActive ? activeClassname : undefined
						}>
						Users
					</NavLink>
					<AccountBtn />
					<SignOutBtn />
				</>
			)}
		</nav>
	);
};
export default Nav;
