import { FC } from 'react';
import Loading from '../../Common/Loading/Loading';
import { IPhoto } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';

const Photos: FC = (props) => {
	const { data, error, isLoading } = useFetch<IPhoto[]>(
		'https://jsonplaceholder.typicode.com/photos'
	);

	const photos = data?.filter((x) => x.thumbnailUrl !== null);

	return (
		<>
			{isLoading && <Loading />}
			{error && <div>{error}</div>}
			<div className="photos">
				{photos &&
					photos.map((photo) => (
						<div key={photo.id}>
							<p>{photo.title}</p>
							<img src={photo.thumbnailUrl} alt="placeholder" />
						</div>
					))}
			</div>
		</>
	);
};

export default Photos;
