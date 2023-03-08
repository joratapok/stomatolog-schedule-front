import {format, parse} from 'date-fns';
import {DATE_FORMAT} from '@box/shared/constants';

export const timeFromDate = (date: string) => {
  const d = parse(date, DATE_FORMAT, new Date());
  return format(d, 'HH:mm');
};
