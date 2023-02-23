import { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faImage, faUsers, faTableList } from '@fortawesome/free-solid-svg-icons';

import { ChangeModeThemeBtn } from '../../Common/ButtonComponents/ChangeModeThemeBtn/ChangeModeThemeBtn';
import { AuthContext } from '../../context/Account/AccountContext';

import { AccountBtn } from '../../Common/ButtonComponents/AccountBtn/AccountBtn';
import { SignOutBtn } from '../../Common/ButtonComponents/SignOutBtn/SignOutBtn';
import { LoginBtn } from '../../Common/ButtonComponents/LoginBtn/LoginBtn';

import './Nav.css';
import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';

export const Nav: FC = () => {
  const mode = useAppSelector(selectThemeMode);

  const { state: user } = useContext(AuthContext);

  let activeClassname = 'activeLink';

  return (
    <nav className={`navigation ${mode}`}>
      <ChangeModeThemeBtn />
      {!user.isAuthenticated && <LoginBtn />}

      {user.isAuthenticated && (
        <>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClassname : undefined)}
            title="Home"
            end
          >
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
          <NavLink
            to="posts"
            className={({ isActive }) => (isActive ? activeClassname : undefined)}
            title="Posts"
          >
            <FontAwesomeIcon icon={faTableList} />
          </NavLink>
          <NavLink
            to="photos"
            className={({ isActive }) => (isActive ? activeClassname : undefined)}
            title="Photos"
          >
            <FontAwesomeIcon icon={faImage} />
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) => (isActive ? activeClassname : undefined)}
            title="Users"
          >
            <FontAwesomeIcon icon={faUsers} />
          </NavLink>
          <AccountBtn />
          <SignOutBtn />
        </>
      )}
    </nav>
  );
};
