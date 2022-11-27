import { FC } from 'react';
import { useFetch } from '../../Hooks/useFetch';

export const Posts: FC = (props) => {
	//jsonplaceholder.typicode.com/posts
	const fetchData = useFetch('jsonplaceholder.typicode.com/posts');

	return (
		<div>
			{fetchData.map((post) => {
				<p>{post}</p>;
			})}
		</div>
	);
};
