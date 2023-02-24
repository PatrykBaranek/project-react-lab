import { FC, useEffect, useRef, useState } from 'react';
import { IUser } from '../../Common/types';
import { useFetch } from '../../Hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMailBulk, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../../Common/components/Loading/Loading';

import './Users.css';
import { useNavigate } from 'react-router-dom';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { useAppSelector } from '../../app/hooks';
import { selectAuth } from '../../app/Auth/authSlice';

export const Users: FC = () => {
  const user = useAppSelector(selectAuth);
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch<IUser[]>(
    'https://jsonplaceholder.typicode.com/users'
  );
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const users = useRef<IUser[]>();

  if (searchPhrase === '') {
    users.current = data as IUser[];
  }

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate('/login');
    }
    if (searchPhrase !== '' && users.current !== undefined) {
      users.current = users.current.filter((user) =>
        user.name.toLowerCase().includes(searchPhrase.trim().toLowerCase())
      );
    }
  }, [searchPhrase, users, navigate, user]);

  return (
    <div className="user-container">
      {isLoading && <Loading />}
      {error && <ErrorPage errorMessage={error} />}

      <h2>Users</h2>

      <div className="search-user">
        <input
          type="text"
          placeholder="enter username"
          value={searchPhrase}
          onChange={(e) =>
            setSearchPhrase(e.target instanceof HTMLInputElement ? e.target.value : '')
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
