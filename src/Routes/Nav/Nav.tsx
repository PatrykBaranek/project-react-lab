import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav: FC = () => {
	let activeClassname = 'activeLink';

	return (
		<nav className="navigation">
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
