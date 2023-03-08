import {IDoctor} from '@box/shared/models/IDoctor';

export const doctorFinder = (id: number, doctors: IDoctor[]) => {
  const doctor = doctors?.find((el) => el.id === id);
  return `${doctor?.lastName} ${doctor?.firstName[0]}.${doctor?.lastName[0]}.`;
};
