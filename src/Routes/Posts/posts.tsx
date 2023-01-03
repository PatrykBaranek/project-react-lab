import { FC, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../Common/Loading/Loading';
import { IPost, IUser } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';
import './Posts.css';
import { AuthContext } from '../../context/Account/AccountContext';
import { ThemeContext } from '../../context/Theme/ThemeContext';

export interface IUsernames {
	userId: number;
	username: string;
	postId: number;
}

export const Posts: FC = () => {
	const { state: user } = useContext(AuthContext);
	const { state: mode } = useContext(ThemeContext);
	const {
		data: posts,
		error,
		isLoading,
	} = useFetch<IPost[]>('https://jsonplaceholder.typicode.com/posts');
	const { data: users } = useFetch<IUser[]>(
		'https://jsonplaceholder.typicode.com/users'
	);
	const [usernames, setUserNames] = useState<IUsernames[] | undefined>([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user.isAuthenticated) {
			navigate('/login');
		}
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
	}, [posts, users, user, navigate]);

	const handleClick = (postId: number) => {
		navigate(`${postId}`);
	};

	return (
		<>
			{isLoading && <Loading />}
			{error && <div className="error">{error}</div>}
			<div className={`posts-container ${mode}`}>
				<h2>Posts</h2>
				<div className="create-new-post-container">
					<button className="create-new-post">Create Post</button>
				</div>
				{posts &&
					posts.map((post) => (
						<div
							className="post"
							key={post.id}
							onClick={() => handleClick(post.id)}
							title="Click to see details">
							<div className="post-title">
								<p>{post.title}</p>
							</div>
							<div className="post-body">
								<p>
									{post.body.length > 50
										? post.body.slice(40, post.body.length - 1) + '...'
										: post.body}
								</p>
							</div>
							<div className="post-createdBy">
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
