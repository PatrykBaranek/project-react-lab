import signOutIcon from '../../../assets/sign-out-icon.svg';
import { logout } from '../../../app/Auth/authSlice';
import { ThemeMode, selectThemeMode } from '../../../app/Theme/themeSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import './SignOutBtn.css';
import { useNavigate } from 'react-router-dom';

export const SignOutBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode);
  const navigate = useNavigate();

  return (
    <div className={`sign-out-btn-container ${mode}`} title="Sign out">
      <img
        src={signOutIcon}
        className="sign-out-btn"
        onClick={() => {
          dispatch(logout());
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
