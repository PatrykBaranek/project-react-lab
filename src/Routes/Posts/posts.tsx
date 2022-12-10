import { FC } from 'react';
import { IPost, MethodType } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';
import './Posts.css';

export const Posts: FC = (props) => {
	const { data, error, isLoading } = useFetch<IPost>(
		'https://jsonplaceholder.typicode.com/posts',
		MethodType.GET
	);

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{error && <div className="error">{error}</div>}
			<div className="posts">
				{data.map((post) => (
					<div className="card" key={post.id}>
						<div className="card-title">
							<p>{post.title}</p>
						</div>
						<div className="card-body">
							<p>
								{post.body.length > 20
									? post.body.slice(20, post.body.length) + '...'
									: post.body}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
