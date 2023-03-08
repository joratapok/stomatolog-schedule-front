import {FetchArgs} from '@reduxjs/toolkit/query';
import {
  IClient,
  ICreateClient,
  IFullClient,
  IPatchClient,
} from '@box/shared/models';
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
      providesTags: (result) => {
        if (result) {
          return [{type: 'customer-detail', id: result?.id}];
        } else {
          return [{type: 'customer-detail'}];
        }
      },
    }),
    patchClient: build.mutation<IClient, IPatchClient>({
      query: (body) => ({
        url: `api/events/customer/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, err, arg) => [{type: 'customer-detail', id: arg.id}],
    }),
    createClient: build.mutation<IClient, ICreateClient>({
      query: (body) => ({
        url: 'api/events/customer/',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        {type: 'customer-detail', id: result?.id},
      ],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerDetailQuery,
  usePatchClientMutation,
  useCreateClientMutation,
} = customersApi;
