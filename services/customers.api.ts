import {FetchArgs} from '@reduxjs/toolkit/query';
import {api} from './rtkBaseApi';
import {IClient} from '../models/IClient';

export const customersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomers: build.query<IClient[], string>({
      query: (lastName = '') => {
        const queryArgs: FetchArgs = {url: 'api/events/customer'};
        if (lastName) {
          queryArgs['params'] = {lastName: lastName};
        }
        return queryArgs;
      },
      providesTags: ['customers'],
    }),
  }),
});

export const {useGetCustomersQuery} = customersApi;
