import { useContext } from 'react';
import { AuthContext } from '../../../../context/Account/AccountContext';

import signOutIcon from '../../../../assets/sign-out-icon.svg';

import './SignOutBtn.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';
import { ThemeMode, selectThemeMode } from '../../../../app/Theme/themeSlice';

export const SignOutBtn: React.FC = () => {
  const { handleLogout } = useContext(AuthContext);
  const mode = useAppSelector(selectThemeMode);
  const navigate = useNavigate();

  return (
    <div className={`sign-out-btn-container ${mode}`} title="Sign out">
      <img
        src={signOutIcon}
        className="sign-out-btn"
        onClick={() => {
          handleLogout();
          navigate('/login');
        }}
        alt="sign out button"
        style={{
          filter: mode === ThemeMode.dark ? 'invert(100%)' : 'invert(20%)',
        }}
      />
    </div>
  );
};
