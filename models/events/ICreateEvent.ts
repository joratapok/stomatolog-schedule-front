import {IClient} from '../IClient';

export enum EventStatus {
  NOT_CONFIRMED = 'not_confirmed',
  CONFIRMED = 'confirmed',
  RECEPTION_COMPLETED = 'reception_completed',
  CANCELED = 'canceled',
  NO_SHOW = 'no_show',
}

export interface ICreateEvent {
  dateStart: string;
  dateFinish: string;
  service: string;
  status: EventStatus;
  color?: string;
  cabinet: number;
  doctor: number;
  client: IClient | number;
}
