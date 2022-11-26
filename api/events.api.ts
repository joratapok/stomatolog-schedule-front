import {IAuthReq, IAuthRes} from '../models/IAuth';
import {instance} from './api';
import {IProfile} from '../models/IProfile';
import {IClinic} from '../models/IEvents';

export const eventsApiFn = {
  events(date?: string) {
    return instance.get<IClinic[]>(`api/events?date=${date}`);
  },
};
