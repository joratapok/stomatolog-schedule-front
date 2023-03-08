import {api} from '@box/shared/store/services/rtkBaseApi';
import {IPatchClinic} from '@box/shared/models';

export const clinicApi = api.injectEndpoints({
  endpoints: (build) => ({
    patchClinic: build.mutation<Record<string, never>, IPatchClinic>({
      query: (body) => ({
        url: `api/events/clinic/${body.id}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['events'],
    }),
  }),
});

export const {usePatchClinicMutation} = clinicApi;
