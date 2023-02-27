import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Theme/themeSlice';
import authReducer from './Auth/authSlice';
import postsReducer from './Posts/postsSlice';
import usersReducer from './Users/usersSlice';
import commentsReducer from './Comments/commentsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
