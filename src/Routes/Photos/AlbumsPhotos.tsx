import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useFetch } from '../../Hooks/useFetch';
import { IAlbum, IPhoto } from '../../Common/types';

import { Loading } from '../../Common/Loading/Loading';
import { AuthContext } from '../../context/Account/AccountContext';
import { Photos } from '../../Common/components/PhotoComponent/Photos';
import {
	Albums,
	ISearchAlbumParams,
} from '../../Common/components/AlbumsComponent/Albums';
import { ErrorPage } from '../ErrorPage/ErrorPage';

import './AlbumPhotos.css';

export type SearchType = 'albumId' | 'photoId';

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

	const [albumSearchParams, setAlbumSearchParams] = useSearchParams();

	const handleAlbumSearchParams = (params: ISearchAlbumParams) => {
		setAlbumSearchParams({
			albumId: params.albumId as string,
			username: params.username as string,
			albumTitle: params.albumTitle as string,
		});
	};

	const [searchPhotoOrAlbumId, setSearchPhotoOrAlbumId] = useState<
		number | undefined
	>(undefined);
	const [selectedOption, setSelectedOption] = useState<SearchType>('albumId');

	useEffect(() => {
		const changeFetchUrl = () => {
			window.scrollTo(0, 0);

			if (selectedOption === 'albumId' && albumSearchParams.toString() === '') {
				if (searchPhotoOrAlbumId === undefined)
					return setUrl('https://jsonplaceholder.typicode.com/albums/');
				setUrl(
					'https://jsonplaceholder.typicode.com/albums?id=' +
						searchPhotoOrAlbumId
				);
			} else if (
				selectedOption === 'photoId' &&
				albumSearchParams.toString() === ''
			) {
				if (searchPhotoOrAlbumId === undefined)
					return setUrl('https://jsonplaceholder.typicode.com/photos');
				setUrl(
					'https://jsonplaceholder.typicode.com/photos?id=' +
						searchPhotoOrAlbumId
				);
			} else if (albumSearchParams.toString() !== '') {
				setSelectedOption('photoId');
				setUrl(
					'https://jsonplaceholder.typicode.com/photos?albumId=' +
						albumSearchParams.get('albumId')
				);
				if (searchPhotoOrAlbumId !== undefined) {
					setUrl(
						'https://jsonplaceholder.typicode.com/photos?albumId=' +
							albumSearchParams.get('albumId') +
							'&id=' +
							searchPhotoOrAlbumId
					);
				}
			}
		};

		changeFetchUrl();
	}, [searchPhotoOrAlbumId, selectedOption, albumSearchParams]);

	const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value as SearchType);
		setAlbumSearchParams({});
		setSearchPhotoOrAlbumId(undefined);
	};

	const handleClear = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target instanceof HTMLInputElement) {
			if (e.target.value === '') {
				e.target.value = '';
				setSearchPhotoOrAlbumId(undefined);
			}
		}
	};

	return (
		<div className="photos-albums-container">
			{isLoading && <Loading />}
			{error && <ErrorPage errorMessage={error} />}
			{selectedOption === 'photoId' && <h2 className="page-title">Photos</h2>}
			{selectedOption === 'albumId' && <h2 className="page-title">Albums</h2>}
			<div className="search-albums-photos">
				<input
					type="number"
					placeholder="enter id"
					value={Number(searchPhotoOrAlbumId).toString()}
					onChange={(e) => {
						setSearchPhotoOrAlbumId(Number(e.target.value));
						handleClear(e);
					}}
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
				<Photos
					photos={data as IPhoto[]}
					albumId={albumSearchParams.get('albumId')}
					username={albumSearchParams.get('username')}
					albumTitle={albumSearchParams.get('albumTitle')}
				/>
			) : (
				<Albums
					albums={data as IAlbum[]}
					setSearchParams={handleAlbumSearchParams}
				/>
			)}
		</div>
	);
};
