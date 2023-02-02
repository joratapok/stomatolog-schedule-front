import {IServiceList} from '@box/shared/models/IPriceList';
import {CabinetEvent} from '@box/shared/models/IEvents';

export interface IClient {
  id?: number;
  firstName: string;
  lastName: string;
  middleName: string;
  /** Format yyyy-MM-dd */
  dateOfBirth: string;
  gender: 'male' | 'female';
  phone: string;
}

export interface ITeeth {
  toothNumber: number;
  dentalServices: IServiceList[];
  count: number;
  event: CabinetEvent;
}

export interface IDentalChart {
  id: number;
  teeth: ITeeth[];
}

export interface IFullClient extends IClient {
  dentalChart: IDentalChart;
}
