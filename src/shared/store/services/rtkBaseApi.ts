import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/query/react';
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

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 6});

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    'events',
    'customers',
    'customer-detail',
    'priceList',
    'event-pdf',
  ],
  endpoints: () => ({}),
});
