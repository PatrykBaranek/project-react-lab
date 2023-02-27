import { createSlice } from '@reduxjs/toolkit';
import { IAlbum, StatusType } from '../../types/types';

interface AlbumsInitialState {
  albums: IAlbum[];
  status: StatusType;
  error: string;
}

const initialState: AlbumsInitialState = {
  albums: [],
  status: 'idle',
  error: '',
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
});
