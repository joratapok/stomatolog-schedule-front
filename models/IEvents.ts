import {IPriceService, IServiceList} from './IPriceList';
import {EventStatus} from './events/ICreateEvent';

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface IDutyShift {
  id?: number;
  dateStart: string;
  dateFinish: string;
  doctor: number;
  cabinet: number;
}

export interface CabinetEvent {
  id: number;
  dateStart: string;
  dateFinish: string;
  comment: string;
  services: IServiceList;
  status: EventStatus;
  color?: string;
  client: Client;
  doctor: number;
}

export interface Cabinet {
  id: number;
  name: string;
  cabinetEvents: CabinetEvent[];
  dutyShift: IDutyShift[];
}

export interface IDoctor {
  id: 4;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  dateOfBirth: string;
  phone: string;
  image: null | string;
  speciality: string;
  clinic: Array<number>;
}

export interface IClinic {
  id: number;
  title: string;
  slug: string;
  cabinets: Cabinet[];
  phone: string;
  isActive: boolean;
  isMain: boolean;
  startOfTheDay: string;
  endOfTheDay: string;
  doctors: Array<IDoctor>;
}
