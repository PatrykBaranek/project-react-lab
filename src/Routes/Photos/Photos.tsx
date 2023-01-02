import { FC } from 'react';
import { IPhoto } from '../../Common/types';

export interface IPhotoProps {
	photos: IPhoto[] | IPhoto | undefined;
}

export const Photos: FC<IPhotoProps> = ({ photos }) => {
	return (
		<div className="photos">
			{photos instanceof Array ? (
				photos.map((photo) => (
					<div key={photo.id}>
						<p>{photo.title}</p>
						<img src={photo.thumbnailUrl} alt="placeholder" />
					</div>
				))
			) : (
				<div>
					<p>{photos?.id}</p>
					<p>{photos?.title}</p>
					<p>{photos?.url}</p>
					<img src={photos?.thumbnailUrl} alt="placeholder" />
				</div>
			)}
		</div>
	);
};
