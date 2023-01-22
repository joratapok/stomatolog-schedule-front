import {FetchArgs} from '@reduxjs/toolkit/query';
import {api} from './rtkBaseApi';
import {IClinic, IDutyShift} from '../models/IEvents';
import {ICreateEvent, IPatchEvent} from '../models/events/ICreateEvent';

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
    createEvent: build.mutation<ICreateEvent, any>({
      query: (body) => ({
        url: 'api/events/create/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['events'],
    }),
    patchEvent: build.mutation<IPatchEvent, any>({
      query: (body) => ({
        url: `api/events/${body.id}/`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['events'],
    }),
    deleteEvent: build.mutation<{success: boolean; id: number}, number>({
      query(id) {
        return {
          url: `api/events/${id}/`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['events'],
    }),
    createDutyShift: build.mutation<IDutyShift, any>({
      query: (body) => ({
        url: 'api/events/duty-shift/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['events'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useCreateDutyShiftMutation,
  useDeleteEventMutation,
  usePatchEventMutation,
} = eventsApi;
