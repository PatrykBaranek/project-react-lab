import { ThemeMode } from '../../../context/Theme/ThemeContext';

// assets
import lightDarkThemeIcon from '../../../assets/dark-mode-icon.svg';

// styles
import './ChangeModeThemeBtn.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeMode, selectThemeMode } from '../../../app/Theme/themeSlice';

export const ChangeModeThemeBtn: React.FC = () => {
  const mode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`change-mode ${mode}`}
      onClick={() => dispatch(changeMode(mode))}
      title="Change theme mode"
    >
      <img
        src={lightDarkThemeIcon}
        alt="dark/light mode"
        style={{
          filter: mode === ThemeMode.dark ? 'invert(100%)' : 'invert(20%)',
        }}
      />
    </div>
  );
};
