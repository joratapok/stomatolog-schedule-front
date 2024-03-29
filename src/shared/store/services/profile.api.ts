import {IPatchDoctor, IProfile} from '@box/shared/models';
import {api} from './rtkBaseApi';

export const profileApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      createProfile: build.mutation<IProfile, any>({
        query: (body) => ({
          url: 'api/profile/create/',
          method: 'POST',
          body,
        }),
        invalidatesTags: ['events'],
      }),
      patchProfile: build.mutation<IPatchDoctor, any>({
        query: (body) => ({
          url: `api/profile/${body.id}/`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['events'],
      }),
    };
  },
});

export const {useCreateProfileMutation, usePatchProfileMutation} = profileApi;
