import { FC } from 'react';
import { IAlbum, IPhoto, IUser } from '../../types';

import './Photos.css';

export interface IPhotoProps {
	photos: IPhoto[] | undefined;
	albumId: string | null;
	username: string | null;
	albumTitle: string | null;
}

export interface IAlbumUser extends IAlbum, IUser {}

export const Photos: FC<IPhotoProps> = ({
	photos,
	albumId,
	username,
	albumTitle,
}) => {
	return (
		<div className="photos-container">
			{albumId && username && albumTitle && (
				<div className="photos-album-title">
					<h3>Album no. {albumId}</h3>
					<h4>Author: {username}</h4>
					<h4>Title: {albumTitle}</h4>
				</div>
			)}
			{photos &&
				photos.map((photo) => (
					<div
						key={photo.id}
						className={`photo-img-container ${
							photos.length === 1 ? 'single-photo' : ''
						}`}>
						<img src={photo.thumbnailUrl} alt="placeholder" />
						<div className="photo-img-overlay">
							<p>{photo.id}</p>
							<p>{photo.title}</p>
						</div>
					</div>
				))}
		</div>
	);
};
