import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import themeReducer from './Theme/themeSlice';
import authReducer from './Auth/authSlice';
import { jsonPlaceholderApi } from './api/jsonPlaceholderApi';

export const store = configureStore({
  reducer: {
    [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer,
    theme: themeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceholderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
