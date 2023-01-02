import React, { FC, useContext, useEffect, useState } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import { IAlbum, IPhoto } from '../../Common/types';

import Loading from '../../Common/Loading/Loading';
import { AuthContext } from '../../context/Account/AccountContext';
import { useNavigate } from 'react-router-dom';
import { Photos } from './Photos';
import { Albums } from './Albums';
import { ErrorPage } from '../ErrorPage/ErrorPage';

export const AlbumPhotos: FC = () => {
	const { state: user } = useContext(AuthContext);
	const navigate = useNavigate();
	if (!user.isAuthenticated) {
		navigate('/login');
	}

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
			{error && <ErrorPage errorMessage={error} />}
			<div className="search-photos">
				<input
					type="number"
					min={1}
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
				<Photos photos={data as IPhoto[] | IPhoto} />
			) : (
				<Albums albums={data as IAlbum[] | IAlbum} />
			)}
		</>
	);
};
