import {Cabinet} from '../models/IEvents';

export type StateDate = {
  date: number;
  dateText: string;
};
export type InitCreateEvent = {
  cabinet: Cabinet;
  timeStart: string;
  doctor?: number;
};
