import { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

import { Loading } from '../../Common/Loading/Loading';
import { IComment } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';

import './Comments.css';
import { ThemeContext } from '../../context/Theme/ThemeContext';

export interface ICommentsProps {
	postId: string;
}

export const Comments: FC<ICommentsProps> = ({ postId }: ICommentsProps) => {
	const { state: mode } = useContext(ThemeContext);

	const { data: comments, isLoading } = useFetch<IComment[]>(
		`https://jsonplaceholder.typicode.com/posts/${postId}/comments`
	);

	return (
		<>
			{isLoading && <Loading />}
			<div className={'comments-container ' + mode}>
				<div className="comments-count">
					<b>{comments?.length} </b>
					<FontAwesomeIcon icon={faComments} />
				</div>
				<button className="create-comment-btn">Create New Comment</button>
				{comments &&
					comments.map((comment) => (
						<div key={comment.id} className="comment">
							<div className="comment-author">
								<p>{comment.email}</p>
							</div>
							<div className="comment-name">
								<p>{comment.name}</p>
							</div>
							<div className="comment-body">
								<p>{comment.body}</p>
							</div>
						</div>
					))}
			</div>
		</>
	);
};
