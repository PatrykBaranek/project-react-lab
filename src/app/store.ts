import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Theme/themeSlice';
import authReducer from './Auth/authSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
