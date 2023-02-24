import accountIcon from '../../../../assets/account-icon.svg';

import './AccountBtn.css';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../../../app/hooks';
import { ThemeMode, selectThemeMode } from '../../../../app/Theme/themeSlice';

export const AccountBtn: React.FC = () => {
  const mode = useAppSelector(selectThemeMode);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className={`account-btn-container ${mode}`} title="Dashboard" onClick={handleClick}>
      <img
        className="account-btn"
        src={accountIcon}
        alt="account button"
        style={{
          filter: mode === ThemeMode.dark ? 'invert(100%)' : 'invert(20%)',
        }}
      />
    </div>
  );
};
