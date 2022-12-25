import { FC, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nav.css';
import { ThemeContext } from '../../context/Theme/ThemeContext';
import { ChangeModeTheme } from '../../Common/ChangeModeTheme/ChangeModeTheme';
import { AuthContext } from '../../context/Account/AccountContext';

const Nav: FC = () => {
	const { state: mode } = useContext(ThemeContext);
	const { state: user, handleLogout } = useContext(AuthContext);

	let activeClassname = 'activeLink';

	return (
		<nav className={`navigation ${mode}`}>
			<ChangeModeTheme />
			{!user.isAuthenticated ? (
				<Link to="login" className="">
					login
				</Link>
			) : (
				<button onClick={handleLogout}>Log Out</button>
			)}
			<NavLink
				to="/"
				className={({ isActive }) => (isActive ? activeClassname : undefined)}
				end>
				Home
			</NavLink>
			<NavLink
				to="posts"
				className={({ isActive }) => (isActive ? activeClassname : undefined)}>
				Posts
			</NavLink>
			<NavLink
				to="photos"
				className={({ isActive }) => (isActive ? activeClassname : undefined)}>
				Photos
			</NavLink>
			<NavLink
				to="users"
				className={({ isActive }) => (isActive ? activeClassname : undefined)}>
				Users
			</NavLink>
		</nav>
	);
};
export default Nav;
