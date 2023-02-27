import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusType, IComment } from '../../types/types';
import axios from 'axios';
import { RootState } from '../store';

interface CommentsInitialState {
  comments: IComment[];
  status: StatusType;
  error: string;
}

const initialState: CommentsInitialState = {
  comments: [],
  status: 'idle',
  error: '',
};

export const fetchCommentsForPostId = createAsyncThunk(
  'comments/fetchCommentsForPostId',
  async (postId: string) => {
    const response = await axios.get<IComment[]>(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.data;
  }
);

export const addCommentToPost = createAsyncThunk(
  'comments/addCommentToPost',
  async (comment: IComment) => {
    const response = await axios.post(``);
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsForPostId.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCommentsForPostId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchCommentsForPostId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      });
  },
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsError = (state: RootState) => state.comments.error;

export default commentsSlice.reducer;
