export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Doctor {
  user: User;
}

export interface CabinetEvent {
  id: number;
  dateStart: Date;
  dateFinish: Date;
  service: string;
  status: string;
  color?: string;
  client: Client;
  doctor: Doctor;
}

export interface Cabinet {
  id: number;
  name: string;
  cabinetEvents: CabinetEvent[];
}

export interface IClinic {
  id: number;
  title: string;
  slug: string;
  cabinets: Cabinet[];
  phone: string;
  isActive: boolean;
}
