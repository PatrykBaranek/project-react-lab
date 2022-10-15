import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Nav: FC = () => {
	return (
		<div>
			<Link to="posts">Posts</Link>
			<Link to="/">Home</Link>
			<Link to="photos">Photos</Link>
		</div>
	);
};
