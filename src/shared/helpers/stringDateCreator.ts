import {format} from 'date-fns';

export const stringDateCreator = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm');
};
