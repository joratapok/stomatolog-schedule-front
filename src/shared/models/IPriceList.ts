export type IServiceList = IService[];

export interface IService {
  toothNumber: number;
  dentalServices: IPriceService[];
  count: number;
}

export interface IPriceService {
  id: number;
  title: string;
  price: string;
  type: 'service';
  code: string;
  priceList: number;
}
