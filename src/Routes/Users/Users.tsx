import { FC, useEffect, useRef, useState } from 'react';
import Loading from '../../Common/Loading/Loading';
import { IUser } from '../../Common/types';
import useFetch from '../../Hooks/useFetch';

const User: FC = () => {
	const { data, isLoading } = useFetch<IUser[]>(
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
		<div>
			{isLoading && <Loading />}

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
						<p>{user.id}</p>
						<p>{user.name}</p>
						<p>{user.username}</p>
					</div>
				))
			) : (
				<div>
					<p>Not found related users</p>
				</div>
			)}
		</div>
	);
};

export default User;
