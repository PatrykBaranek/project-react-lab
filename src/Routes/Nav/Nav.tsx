import { FC } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export const Nav: FC = () => {
	return (
		<nav className="navigation">
			<Link to="/">Home</Link>
			<Link to="posts">Posts</Link>
			<Link to="photos">Photos</Link>
		</nav>
	);
};
