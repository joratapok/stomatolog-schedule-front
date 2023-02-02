export interface IDoctor {
  id: number;
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
