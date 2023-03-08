import {CabinetEvent} from '@box/shared/models/IEvents';
import {IDutyShift} from '@box/shared/models/IDutyShift';

export interface ICabinet {
  id: number;
  name: string;
  cabinetEvents: CabinetEvent[];
  dutyShift: IDutyShift[];
}

export interface ICabinetCreator {
  clinic: number;
  name: string;
}
