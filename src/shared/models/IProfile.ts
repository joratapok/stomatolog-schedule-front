export enum ERoles {
  administrator = 'administrator',
  doctor = 'doctor',
}

export interface IProfile {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: ERoles;
  dateOfBirth: string;
  phone: string;
  image?: string;
  speciality?: string;
  clinic: number[];
  token?: string;
  isActive: boolean;
}
