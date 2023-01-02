import { FC } from 'react';
import { IAlbum } from '../../Common/types';

interface IAlbumsProps {
	albums: IAlbum | IAlbum[] | undefined;
}

export const Albums: FC<IAlbumsProps> = ({ albums }) => {
	return (
		<div className="albums">
			{albums instanceof Array ? (
				albums.map((album) => (
					<div key={album.id}>
						<p>{album.id}</p>
						<p>{album.title}</p>
					</div>
				))
			) : (
				<div>
					<p>{albums?.id}</p>
					<p>{albums?.title}</p>
				</div>
			)}
		</div>
	);
};
