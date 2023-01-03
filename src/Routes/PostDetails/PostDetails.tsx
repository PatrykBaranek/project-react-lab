import { FC, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPost } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';
import { AuthContext } from '../../context/Account/AccountContext';
import { Comments } from '../Comments/Comments';

import './PostDetails.css';
import { ThemeContext } from '../../context/Theme/ThemeContext';

export interface IPostDetailsProps {
	postId: number;
	title: string;
	body: string;
	userId: number;
}

export const PostDetails: FC = () => {
	const { state: user } = useContext(AuthContext);
	const { state: mode } = useContext(ThemeContext);
	const navigate = useNavigate();
	if (!user.isAuthenticated) {
		navigate('/login');
	}

	const { id } = useParams();

	const { data: post } = useFetch<IPost>(
		'https://jsonplaceholder.typicode.com/posts/' + id
	);

	return (
		<div className={'post-details-container ' + mode}>
			<div className="post-title">
				<h3>{post?.title}</h3>
			</div>
			<div className="post-body">
				<p>{post?.body}</p>
			</div>
			<br />
			<Comments postId={String(id)} />
		</div>
	);
};
