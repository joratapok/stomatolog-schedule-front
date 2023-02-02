import {FetchArgs} from '@reduxjs/toolkit/query';
import {IClient, IFullClient} from '@box/shared/models';
import {api} from './rtkBaseApi';

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
    getCustomerDetail: build.query<IFullClient, string>({
      query: (id = '') => {
        return {url: `api/events/customer/${id}/detail/`};
      },
      providesTags: ['customer-detail'],
    }),
  }),
});

export const {useGetCustomersQuery, useGetCustomerDetailQuery} = customersApi;
