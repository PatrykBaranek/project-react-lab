import { FC, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IPost } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';
import { AuthContext } from '../../context/Account/AccountContext';
import { Comments } from '../Comments/Comments';

export interface IPostDetailsProps {
	postId: number;
	title: string;
	body: string;
	userId: number;
}

export const PostDetails: FC = () => {
	const { state: user } = useContext(AuthContext);
	const navigate = useNavigate();
	if (!user.isAuthenticated) {
		navigate('/login');
	}

	const { id } = useParams();

	const { data } = useFetch<IPost>(
		'https://jsonplaceholder.typicode.com/posts/' + id
	);

	return (
		<div className="post-details">
			<p>{data?.id}</p>
			<p>{data?.title}</p>
			<p>{data?.body}</p>
			<br />
			<Comments postId={String(id)} />
		</div>
	);
};
