import { createSlice } from '@reduxjs/toolkit';
import { IPhoto, StatusType } from '../../types/types';

interface PhotosInitialState {
  photos: IPhoto[];
  status: StatusType;
  error: string;
}

const initialState: PhotosInitialState = {
  photos: [],
  status: 'idle',
  error: '',
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
});
