import {ICabinet, ICabinetCreator} from '@box/shared/models';
import {api} from './rtkBaseApi';

export const cabinetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createCabinets: build.mutation<ICabinet, ICabinetCreator>({
      query: (body) => ({
        url: 'api/events/cabinet/create/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['events'],
    }),
    deleteCabinet: build.mutation<Record<string, never>, number>({
      query: (id) => ({
        url: `api/events/cabinet/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['events'],
    }),
  }),
});

export const {useCreateCabinetsMutation, useDeleteCabinetMutation} =
  cabinetsApi;
