import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
import type {FetchArgs} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {baseURL} from '@box/shared/api';
import {RootState} from '../store';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (
    headers: Headers,
    {getState}: {getState: () => unknown; endpoint: string}
  ) => {
    const {accessToken} = (getState() as RootState).authSlice;
    if (accessToken) {
      headers.set('Authorization', `Token ${accessToken}`);
    }
    return headers;
  },
});

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    /*
     * If we get 400 or 401 status code prevent retries and throw error immediately
     */
    if (result.error?.status === 400 || result.error?.status === 401) {
      retry.fail(result.error);
    }

    return result;
  },
  {
    maxRetries: 3,
  }
);

//const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3});

export const api = createApi({
  baseQuery: staggeredBaseQueryWithBailOut,
  tagTypes: [
    'events',
    'customers',
    'customer-detail',
    'priceList',
    'event-pdf',
  ],
  endpoints: () => ({}),
});
