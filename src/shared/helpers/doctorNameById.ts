import {IDoctor} from '@box/shared/models';

export const doctorNameById = (doctors: IDoctor[], id: number) => {
  const doctor = doctors.find((doc) => doc.id === id);
  return `${doctor?.lastName} ${doctor?.firstName[0]}. ${doctor?.middleName[0]}.`;
};
