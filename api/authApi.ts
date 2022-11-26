import {IAuthReq, IAuthRes} from '../models/IAuth';
import {instance} from './api';
import {IProfile} from '../models/IProfile';

export const authApi = {
  login(data: IAuthReq) {
    return instance.post<IAuthRes>('api/profile/auth/token/login', data);
  },
  logout() {
    return instance.post<IAuthRes>('api/profile/auth/token/logout');
  },
  auth() {
    return instance.get<IProfile>('api/profile/info');
  },
};
