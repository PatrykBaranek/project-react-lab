import React, { FC, useEffect, useRef, useState } from 'react';
import Loading from '../../Common/Loading/Loading';
import { IAlbum, IPhoto } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';
import Albums from './Albums';
import Photos from './Photos';

const AlbumPhotos: FC = () => {
	const [url, setUrl] = useState<string>(
		'https://jsonplaceholder.typicode.com/photos/'
	);

	const { data, error, isLoading } = useFetch<
		IPhoto[] | IAlbum[] | IPhoto | IAlbum
	>(url);

	const [searchPhotoOrAlbumId, setSearchPhotoOrAlbumId] = useState<
		number | undefined
	>(undefined);
	const [selectedOption, setSelectedOption] = useState<string>('albumId');

	useEffect(() => {
		const changeFetchUrl = () => {
			if (selectedOption === 'albumId') {
				if (searchPhotoOrAlbumId === undefined)
					return setUrl('https://jsonplaceholder.typicode.com/albums/');
				setUrl(
					'https://jsonplaceholder.typicode.com/albums?id=' +
						searchPhotoOrAlbumId
				);
			} else if (selectedOption === 'photoId') {
				if (searchPhotoOrAlbumId === undefined)
					return setUrl('https://jsonplaceholder.typicode.com/photos');
				setUrl(
					'https://jsonplaceholder.typicode.com/photos?id=' +
						searchPhotoOrAlbumId
				);
			}
		};

		changeFetchUrl();
	}, [searchPhotoOrAlbumId, selectedOption]);

	const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (e.target instanceof HTMLSelectElement) {
			setSelectedOption(e.target.value);
		}
	};

	const handleClear = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target instanceof HTMLInputElement) {
			e.target.value = '';
			setSearchPhotoOrAlbumId(undefined);
		}
	};

	return (
		<>
			{isLoading && <Loading />}
			{error && <div>{error}</div>}
			<div className="search-photos">
				<input
					type="number"
					min={1}
					max={data instanceof Array ? data.length : 1000}
					placeholder="enter id"
					value={searchPhotoOrAlbumId}
					onChange={(e) => setSearchPhotoOrAlbumId(Number(e.target.value))}
					onBlur={handleClear}
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
				<Albums albums={data as IAlbum[] | IAlbum} />
			)}
		</>
	);
};

export default AlbumPhotos;
