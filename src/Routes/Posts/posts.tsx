import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Common/Loading/Loading';
import { IPost, IUser } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';
import './Posts.css';

export interface IUsernames {
	userId: number;
	username: string;
	postId: number;
}

const Posts: FC = () => {
	const navigate = useNavigate();

	const {
		data: posts,
		error,
		isLoading,
	} = useFetch<IPost[]>('https://jsonplaceholder.typicode.com/posts');

	const { data: users } = useFetch<IUser[]>(
		'https://jsonplaceholder.typicode.com/users'
	);

	const [usernames, setUserNames] = useState<IUsernames[] | undefined>([]);

	useEffect(() => {
		if (users !== undefined && posts !== undefined) {
			const usernames = users?.map((user) => {
				return {
					userId: user.id,
					username: user.name,
					postId: posts?.find((post) => post.userId === user.id)?.id as number,
				};
			});
			setUserNames(usernames);
		}
	}, [posts, users]);

	const handleClick = (postId: number) => {
		navigate(`${postId}`);
	};

	return (
		<>
			{isLoading && <Loading />}
			{error && <div className="error">{error}</div>}
			<div className="posts">
				{posts &&
					posts.map((post) => (
						<div
							className="card"
							key={post.id}
							onClick={() => handleClick(post.id)}>
							<div className="card-title">
								<p>{post.title}</p>
							</div>
							<div className="card-body">
								<p>
									{post.body.length > 50
										? post.body.slice(40, post.body.length - 1) + '...'
										: post.body}
								</p>
							</div>
							<div className="card-createdBy">
								<p>
									{
										usernames?.find(
											(username) => username.userId === post.userId
										)?.username
									}
								</p>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Posts;
