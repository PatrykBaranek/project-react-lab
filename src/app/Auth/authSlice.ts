import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ILogin {
  username: string;
  password: string;
}

interface AuthInitialState {
  isAuthenticated: boolean;
  login: ILogin | null;
}

const initialState: AuthInitialState = {
  isAuthenticated: false,
  login: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILogin>) {
      state.isAuthenticated = true;
      state.login = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.login = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectLogin = (state: RootState) => state.auth.login;

export default authSlice.reducer;
