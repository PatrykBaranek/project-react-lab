import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { IPost } from '../../types/types';
import axios from 'axios';
import { RootState } from '../store';

interface PostsInitialState {
  posts: IPost[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string;
}

const initialState: PostsInitialState = {
  posts: [],
  status: 'idle',
  error: '',
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost: IPost) => {
  const response = await axios.post<IPost>('https://jsonplaceholder.typicode.com/posts', newPost);
  return response.data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(...action.payload);
        state.posts.map((post) => (post.id = nanoid()));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message as string;
      })
      .addCase(addNewPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        const newPost: IPost = {
          id: nanoid(),
          title: action.payload.title,
          body: action.payload.body,
          userId: action.payload.userId,
        };

        state.posts.push(newPost);
      });
  },
});

export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
