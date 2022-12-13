import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';
import Comments from '../Comments/Comments';

export interface IPostDetailsProps {
	postId: number;
	title: string;
	body: string;
	userId: number;
}

const PostDetails: FC = () => {
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

export default PostDetails;
