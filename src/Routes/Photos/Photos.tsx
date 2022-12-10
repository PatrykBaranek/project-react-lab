import { FC } from 'react';
import { IPhoto, MethodType } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';

export const Photos: FC = (props) => {
	const { data, error, isLoading } = useFetch<IPhoto>(
		'https://jsonplaceholder.typicode.com/photos',
		MethodType.GET
	);

	console.log(data);

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			<div className="photos">
				<img src="" alt="" />
			</div>
		</>
	);
};
