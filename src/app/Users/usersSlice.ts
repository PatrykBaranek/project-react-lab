import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/types';
import axios from 'axios';
import { RootState } from '../store';

interface UsersInitialState {
  users: IUser[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: UsersInitialState = {
  users: [],
  status: 'idle',
  error: '',
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get<IUser[]>(`https://jsonplaceholder.typicode.com/users`);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

export const selectUserById = (state: RootState, userId: number) =>
  state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;
