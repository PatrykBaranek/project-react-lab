import { FC } from 'react';
import { IPhoto } from '../../Common/types';

export interface IPhotoProps {
	photos: IPhoto[] | undefined;
}

const Photos: FC<IPhotoProps> = ({ photos }) => {
	return (
		<div className="photos">
			{photos &&
				photos.map((photo) => (
					<div key={photo.id}>
						<p>{photo.title}</p>
						<img src={photo.thumbnailUrl} alt="placeholder" />
					</div>
				))}
		</div>
	);
};

export default Photos;
