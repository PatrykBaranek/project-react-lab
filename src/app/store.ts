import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Theme/themeSlice';
import authReducer from './Auth/authSlice';
import postsReducer from './Posts/postsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
