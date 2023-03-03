import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMailBulk, faBuilding } from '@fortawesome/free-solid-svg-icons';

import { useGetAllUsersQuery } from '../../app/api/jsonPlaceholderApi';
import { Loading } from '../../components/Loading/Loading';
import './Users.css';

export const Users: React.FC = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const { data: users, isLoading } = useGetAllUsersQuery(searchPhrase);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="user-container">
      <h2>Users</h2>

      <div className="search-user">
        <input
          type="text"
          placeholder="enter username"
          value={searchPhrase}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchPhrase(e.target.value)}
        />
      </div>
      {users?.map((user) => (
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
      ))}
    </div>
  );
};
