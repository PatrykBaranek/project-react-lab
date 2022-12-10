import { FC, useCallback, useEffect, useState } from 'react';
import './Posts.css';

export interface IPost {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export const Posts: FC = (props) => {
	//jsonplaceholder.typicode.com/posts
	const [error, setError] = useState('');
	const [data, setData] = useState<IPost[]>([]);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch(
				'https://jsonplaceholder.typicode.com/posts'
			);
			const dataAPI = await response.json();

			setData(dataAPI);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			}
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<>
			{error && <div className="error">Error</div>}
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
