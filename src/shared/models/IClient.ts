import {IPriceService} from '@box/shared/models/IPriceList';
import {CabinetEvent} from '@box/shared/models/IEvents';

export interface ITreatmentPlan {
  tooth: number;
  plan: string;
}

export interface IClient {
  id?: number;
  firstName: string;
  lastName: string;
  middleName: string;
  /** Format yyyy-MM-dd */
  dateOfBirth: string;
  gender: 'male' | 'female';
  phone: string;
  treatmentPlan: ITreatmentPlan[];
  discount: number;
}

export interface IPatchClient {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: string;
  phone?: string;
  treatmentPlan?: ITreatmentPlan[];
}

export interface ICreateClient {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  phone: string;
  clinic: number;
  gender?: 'male' | 'female';
}

export interface ITeeth {
  toothNumber: number;
  dentalServices: IPriceService[];
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
