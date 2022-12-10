import { FC } from 'react';
import Comments from '../Comments/Comments';

export interface IPostDetailsProps {
	postId: number;
	title: string;
	body: string;
	userId: number;
}

const PostDetails: FC<IPostDetailsProps> = ({ postId, title, body }) => {
	return (
		<div className="post-details">
			<p>{postId}</p>
			<p>{title}</p>
			<p>{body}</p>
			<Comments postId={postId} />
		</div>
	);
};

export default PostDetails;
