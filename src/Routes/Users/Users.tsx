import { FC, useEffect, useRef, useState } from 'react';
import { IUser } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';

import './Users.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPhone,
	faMailBulk,
	faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '../../Common/Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';

const User: FC = () => {
	const { data, isLoading, error } = useFetch<IUser[]>(
		'https://jsonplaceholder.typicode.com/users'
	);
	const [searchPhrase, setSearchPhrase] = useState<string>('');
	const users = useRef<IUser[]>();

	if (searchPhrase === '') {
		users.current = data as IUser[];
	}

	useEffect(() => {
		if (searchPhrase !== '' && users.current !== undefined) {
			users.current = users.current.filter((user) =>
				user.name.toLowerCase().includes(searchPhrase.trim().toLowerCase())
			);
		}
	}, [searchPhrase, users]);

	return (
		<div className="user-container">
			{isLoading && <Loading />}
			{error && <ErrorPage errorMessage={error} />}

			<div className="search-user">
				<input
					type="text"
					placeholder="enter username"
					value={searchPhrase}
					onChange={(e) =>
						setSearchPhrase(
							e.target instanceof HTMLInputElement ? e.target.value : ''
						)
					}
				/>
			</div>
			{users.current?.length !== 0 && users.current !== undefined ? (
				users.current.map((user) => (
					<div className="user-card" key={user.id}>
						<div className="user-name">
							<p>{user.name}</p>
						</div>
						<div className="user-username">
							<p>Username: {user.username}</p>
						</div>
						<div className="user-email">
							<p>
								<FontAwesomeIcon icon={faMailBulk} /> {user.email}
							</p>
						</div>
						<div className="user-phone">
							<p>
								<FontAwesomeIcon icon={faPhone} /> {user.phone}
							</p>
						</div>
						<div className="user-company">
							<p>
								<FontAwesomeIcon icon={faBuilding} />
								{user.company.name}
							</p>
						</div>
					</div>
				))
			) : (
				<ErrorPage errorMessage={'Not found related users'} />
			)}
		</div>
	);
};

export default User;
