export interface Profile {
  middleName: string;
  role: string;
  dateOfBirth: string;
  phone: string;
  image?: string;
  speciality?: string;
  clinic: number[];
}

export interface IProfile {
  username: string;
  firstName: string;
  lastName: string;
  profile: Profile;
  authToken: {authToken: string};
}
