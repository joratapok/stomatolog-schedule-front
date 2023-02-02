import {IDoctor} from '@box/shared/models/IDoctor';
import {ICabinet} from '@box/shared/models/ICabinet';

export interface IClinic {
  id: number;
  title: string;
  slug: string;
  cabinets: ICabinet[];
  phone: string;
  isActive: boolean;
  isMain: boolean;
  startOfTheDay: string;
  endOfTheDay: string;
  doctors: Array<IDoctor>;
  administrators: Array<IDoctor>;
}
