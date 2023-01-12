import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import { IAlbum, IUser } from '../../types';
import { useFetch } from '../../../Hooks/useFetch';
import './Albums.css';

export interface IAlbumsProps {
	albums: IAlbum[] | undefined;
	setSearchParams: ({
		albumId,
		username,
		albumTitle,
	}: ISearchAlbumParams) => void;
}

export interface ISearchAlbumParams {
	albumId: string | undefined;
	username: string | undefined;
	albumTitle: string | undefined;
}

export const Albums: FC<IAlbumsProps> = ({ albums, setSearchParams }) => {
	const { data: users } = useFetch<IUser[]>(
		'https://jsonplaceholder.typicode.com/users'
	);

	return (
		<div className="albums-container">
			{albums &&
				albums.map((album) => (
					<div
						key={album.id}
						className={`album ${albums.length === 1 ? 'single-album' : ''}`}>
						<div className="album-icon">
							<FontAwesomeIcon icon={faFolder} />
						</div>
						<p>{album.title}</p>
						<p>{users?.find((user) => user.id === album.userId)?.name}</p>
						<button
							className="album-details-btn"
							onClick={() =>
								setSearchParams({
									albumId: album.id.toString(),
									username: users?.find((user) => user.id === album.userId)
										?.name,
									albumTitle: album.title,
								})
							}>
							Click to see photos
						</button>
					</div>
				))}
		</div>
	);
};
