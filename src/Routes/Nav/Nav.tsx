import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

const Nav: FC = () => {
	return (
		<nav className="navigation">
			<NavLink to="/">Home</NavLink>
			<NavLink to="posts">Posts</NavLink>
			<NavLink to="photos">Photos</NavLink>
		</nav>
	);
};
export default Nav;
