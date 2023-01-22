export interface IProfile {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: string;
  dateOfBirth: string;
  phone: string;
  image?: string;
  speciality?: string;
  clinic: number[];
  token?: string;
}
