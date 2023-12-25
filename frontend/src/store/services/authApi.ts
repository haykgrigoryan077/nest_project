import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQuery('auth'),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: 'login',
        method: 'POST',
        body
      })
    }),
    register: builder.mutation({
      query: (body: { username: string; password: string; email: string }) => ({
        url: 'register',
        method: 'POST',
        body
      })
    })
  })
});

export const { useLogInMutation } = authApi;
