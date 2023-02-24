import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faImage, faUsers, faTableList } from '@fortawesome/free-solid-svg-icons';

import { ChangeModeThemeBtn } from '../../Common/components/ButtonComponents/ChangeModeThemeBtn/ChangeModeThemeBtn';

import { AccountBtn } from '../../Common/components/ButtonComponents/AccountBtn/AccountBtn';
import { SignOutBtn } from '../../Common/components/ButtonComponents/SignOutBtn/SignOutBtn';
import { LoginBtn } from '../../Common/components/ButtonComponents/LoginBtn/LoginBtn';

import './Nav.css';
import { useAppSelector } from '../../app/hooks';
import { selectThemeMode } from '../../app/Theme/themeSlice';
import { selectAuth } from '../../app/Auth/authSlice';

export const Nav: React.FC = () => {
  const mode = useAppSelector(selectThemeMode);

  const user = useAppSelector(selectAuth);

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
