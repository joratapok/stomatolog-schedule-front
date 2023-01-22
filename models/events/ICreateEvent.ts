import {IClient} from '../IClient';
import {IServiceList} from '../IPriceList';

export enum EventStatus {
  NOT_CONFIRMED = 'not_confirmed',
  CONFIRMED = 'confirmed',
  RECEPTION_COMPLETED = 'reception_completed',
  CANCELED = 'canceled',
  NO_SHOW = 'no_show',
}

export const ToothCard = [
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
];

export interface ICreateEvent {
  dateStart: string;
  dateFinish: string;
  comment: string;
  status: EventStatus;
  services: [];
  color?: string;
  cabinet: number;
  doctor: number;
  client: IClient | number;
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
  client?: IClient | number;
}
