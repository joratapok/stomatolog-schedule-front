import {IDoctor} from '../models/IEvents';

export const doctorFinder = (id: number, doctors: IDoctor[]) => {
  const doctor = doctors?.find((el) => el.id === id);
  return `${doctor?.lastName} ${doctor?.firstName[0]}.${doctor?.lastName[0]}.`;
};
