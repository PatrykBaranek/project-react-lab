import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAlbum, IComment, IPhoto, IPost, IUser } from '../../types/types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<IPost[], void>({
      query: () => '/posts',
    }),
    getPostById: builder.query<IPost, number>({
      query: (postId: number) => `/posts/${postId}`,
    }),
    getAllUsers: builder.query<IUser[], string>({
      query: (name: string) => `/users?q=${name}`,
    }),
    addNewCommentToPost: builder.mutation<
      IComment,
      { userId: number; postId: number; body: Partial<IComment> }
    >({
      query: ({ userId, postId, body }) => ({
        url: `/comments?postId=${postId}&userId=${userId}`,
        body: body,
        method: 'POST',
      }),
    }),
    getAllComents: builder.query<IComment[], number>({
      query: (postId: number) => `/comments?postId=${postId}`,
    }),
    deleteCommentById: builder.mutation<void, number>({
      query: (commentId: number) => ({
        url: `/comment/${commentId}`,
        method: 'DELETE',
      }),
    }),
    getAllPhotos: builder.query<IPhoto[], void>({
      query: () => '/photos',
    }),
    getAllAlbums: builder.query<IAlbum[], void>({
      query: () => `/albums`,
    }),
  }),
});

export const {
  useGetAllAlbumsQuery,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useGetAllComentsQuery,
  useDeleteCommentByIdMutation,
  useAddNewCommentToPostMutation,
  useGetAllUsersQuery,
} = jsonPlaceholderApi;
