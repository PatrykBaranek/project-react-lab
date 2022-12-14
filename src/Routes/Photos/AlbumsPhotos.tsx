import React, { FC, useEffect, useState } from 'react';
import Loading from '../../Common/Loading/Loading';
import { IAlbum, IPhoto } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';
import Albums from './Albums';
import Photos from './Photos';

const AlbumPhotos: FC = () => {
	const [url, setUrl] = useState<string>(
		'https://jsonplaceholder.typicode.com/photos/'
	);

	const { data, error, isLoading } = useFetch<IPhoto[] | IAlbum[]>(url);

	const [searchPhotoOrAlbumId, setSearchPhotoOrAlbumId] = useState<number>();
	const [selectedOption, setSelectedOption] = useState<string>('albumId');

	const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target instanceof HTMLSelectElement) {
			setSelectedOption(e.target.value);
		}
	};

	useEffect(() => {
		const changeFetchUrl = () => {
			if (searchPhotoOrAlbumId !== undefined) {
				if (selectedOption === 'albumId') {
					setUrl(
						'https://jsonplaceholder.typicode.com/albums/' +
							searchPhotoOrAlbumId +
							`/photos`
					);
				} else if (selectedOption === 'photoId') {
					setUrl(
						'https://jsonplaceholder.typicode.com/photos/' +
							searchPhotoOrAlbumId
					);
				}
			}
		};

		changeFetchUrl();
	}, [searchPhotoOrAlbumId, selectedOption]);

	return (
		<>
			{isLoading && <Loading />}
			{error && <div>{error}</div>}
			<div className="search-photos">
				<input
					type="text"
					min={1}
					placeholder="enter id"
					value={searchPhotoOrAlbumId}
					onChange={(e) => setSearchPhotoOrAlbumId(Number(e.target.value))}
				/>
				<select
					name="searchOption"
					value={selectedOption}
					onChange={handleChangeOption}>
					<option value="albumId">Album Id</option>
					<option value="photoId">Photo Id</option>
				</select>
			</div>
			{selectedOption === 'photoId' ? (
				<Photos photos={data as IPhoto[]} />
			) : (
				<Albums albums={data as IAlbum[]} />
			)}
		</>
	);
};

export default AlbumPhotos;
