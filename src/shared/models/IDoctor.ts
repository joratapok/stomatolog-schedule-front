export interface IDoctor {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: IRole;
  dateOfBirth: string;
  phone: string;
  image: null | string;
  speciality: string;
  clinic: Array<number>;
  isActive: boolean;
}

export interface IPatchDoctor {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  role?: IRole;
  dateOfBirth?: string;
  phone?: string;
  image?: string;
  speciality?: string;
  clinic?: Array<number>;
  isActive?: boolean;
}

export type IRole = 'doctor' | 'administrator' | 'owner';
