import { FC } from 'react';
import Loading from '../../Common/Loading/Loading';
import { IComment } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';

export interface ICommentsProps {
	postId: string;
}

export const Comments: FC<ICommentsProps> = ({ postId }: ICommentsProps) => {
	const { data: comments, isLoading } = useFetch<IComment[]>(
		`https://jsonplaceholder.typicode.com/posts/${postId}/comments`
	);

	return (
		<>
			{isLoading && <Loading />}
			{comments &&
				comments.map((comment) => (
					<div key={comment.id}>
						<br />
						<p>commentId = {comment.id}</p>
						<p>commentName = {comment.name}</p>
						<p>commentEmail = {comment.email}</p>
						<p>commentBody = {comment.body}</p>
						<p>commentPostId = {comment.postId}</p>
					</div>
				))}
		</>
	);
};
