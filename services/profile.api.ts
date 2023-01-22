import {api} from './rtkBaseApi';
import {IProfile} from '../models/IProfile';

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
    };
  },
});

export const {useCreateProfileMutation} = profileApi;
