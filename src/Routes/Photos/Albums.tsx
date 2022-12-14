import { FC } from 'react';
import { IAlbum } from '../../Common/types';

interface IAlbumsProps {
	albums: IAlbum[] | undefined;
}

const Albums: FC<IAlbumsProps> = ({ albums }) => {
	return (
		<div className="albums">
			{albums &&
				albums.map((album) => (
					<div key={album.id}>
						<p>{album.id}</p>
						<p>{album.title}</p>
					</div>
				))}
		</div>
	);
};

export default Albums;
