import {IServiceList} from './IPriceList';
import {ICreateClient} from '@box/shared/models/IClient';

export enum EventStatus {
  NOT_CONFIRMED = 'not_confirmed',
  CONFIRMED = 'confirmed',
  RECEPTION_COMPLETED = 'reception_completed',
  CANCELED = 'canceled',
  NO_SHOW = 'no_show',
}

export interface CabinetEvent {
  id: number;
  dateStart: string;
  dateFinish: string;
  comment: string;
  services: IServiceList;
  status: EventStatus;
  color?: string;
  client: ICreateClient;
  doctor: number;
  invoice: string | null;
}

export interface IPatchEvent {
  id: number;
  dateStart?: string;
  dateFinish?: string;
  service?: IServiceList;
  status?: EventStatus;
  color?: string;
  cabinet?: number;
  doctor?: number;
  client?: ICreateClient | number;
}

export interface ICreateEvent {
  dateStart: string;
  dateFinish: string;
  comment: string;
  status: EventStatus;
  services: [];
  color?: string;
  cabinet: number;
  doctor: number;
  client: ICreateClient | number;
}
