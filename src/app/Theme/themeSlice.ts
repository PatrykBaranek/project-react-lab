import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum ThemeMode {
  dark = 'dark',
  light = 'light',
}

interface ThemeInitialState {
  mode: ThemeMode;
}

const getSystemThemeMode = () => {
  let mode: ThemeMode;
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkThemeMq.matches) {
    mode = ThemeMode.dark;
  } else {
    mode = ThemeMode.light;
  }

  return mode;
};

const initialState: ThemeInitialState = {
  mode: getSystemThemeMode(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeMode(state, action: PayloadAction<ThemeMode>) {
      if (action.payload === ThemeMode.dark) {
        state.mode = ThemeMode.light;
      } else {
        state.mode = ThemeMode.dark;
      }
    },
  },
});

export const { changeMode } = themeSlice.actions;

export const selectThemeMode = (state: RootState) => state.theme.mode;

export default themeSlice.reducer;
