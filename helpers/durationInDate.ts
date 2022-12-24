import {addMinutes, format} from 'date-fns';
import {DATE_FORMAT} from '../constants/dateFormat';

export const durationInDate = (start: string, duration: string): string => {
  if (!duration) {
    return '';
  }
  const startDate = new Date(start);
  const endDate = addMinutes(startDate, parseInt(duration, 10));
  return format(endDate, DATE_FORMAT);
};
