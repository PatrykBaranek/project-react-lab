import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Common/Loading/Loading';
import { IPost } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';
import './Posts.css';

const Posts: FC = (props) => {
	const { data, error, isLoading } = useFetch<IPost[]>(
		'https://jsonplaceholder.typicode.com/posts'
	);
	const navigate = useNavigate();

	const handleClick = (postId: number) => {
		navigate(`${postId}`);
	};

	return (
		<>
			{isLoading && <Loading />}
			{error && <div className="error">{error}</div>}
			<div className="posts">
				{data &&
					data.map((post) => (
						<div
							className="card"
							key={post.id}
							onClick={() => handleClick(post.id)}>
							<div className="card-title">
								<p>{post.title}</p>
							</div>
							<div className="card-body">
								<p>
									{post.body.length > 20
										? post.body.slice(20, post.body.length - 1) + '...'
										: post.body}
								</p>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Posts;
