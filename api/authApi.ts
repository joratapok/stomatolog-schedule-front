import {IAuthReq, IAuthRes} from '../models/IAuth';
import {instance} from './api';

export const authApi = {
  login(data: IAuthReq) {
    return instance.post<IAuthRes>('/auth/token/login', data);
  },
};
