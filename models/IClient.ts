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
