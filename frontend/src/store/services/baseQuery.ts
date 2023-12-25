import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_PREFIX } from './api';

const _baseQuery = (baseURL?: string) =>
  fetchBaseQuery({
    baseUrl: API_PREFIX + (baseURL ? baseURL : ''),
    credentials: 'include'
  });

const baseQuery =
  (baseURL?: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    let result = await _baseQuery(baseURL)(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResponse = await axios.post(`${API_PREFIX}/api/v1/auth/refresh`, null, {
        withCredentials: true
      });

      if (refreshResponse.status === 401) {
        return refreshResponse;
      }

      result = await _baseQuery(baseURL)(args, api, extraOptions);
    }

    if (result.error?.data && result.error.status !== 412) {
      if (typeof (result.error.data as { message?: string })?.message === 'string') {
        toast.warn((result.error.data as { message: string }).message);
      }
    }

    return result;
  };

export default baseQuery;
