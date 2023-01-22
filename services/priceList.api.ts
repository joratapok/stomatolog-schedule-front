import {api} from './rtkBaseApi';
import {FetchArgs} from '@reduxjs/toolkit/query';
import {IPriceService} from '../models/IPriceList';

export const priceListApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<IPriceService[], string>({
      query: (service = '') => {
        const queryArgs: FetchArgs = {url: 'api/price/service/'};
        if (service) {
          queryArgs['params'] = {service};
        }
        return queryArgs;
      },
      providesTags: ['priceList'],
    }),
  }),
});

export const {useGetServicesQuery} = priceListApi;
