import {FetchArgs} from '@reduxjs/toolkit/query';
import {api} from './rtkBaseApi';
import {IClinic} from '../models/IEvents';

export const eventsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IClinic[], string>({
      query: (date = '') => {
        const queryArgs: FetchArgs = {url: 'api/events'};
        if (date) {
          queryArgs['params'] = {date};
        }
        return queryArgs;
      },
      providesTags: ['events'],
    }),
  }),
});

export const {useGetEventsQuery} = eventsApi;
