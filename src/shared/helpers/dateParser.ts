import {parse} from 'date-fns';
import {DATE_FORMAT} from '../constants/dateFormat';

export const dateParser = (dateString: string): Date => {
  return parse(dateString, DATE_FORMAT, new Date());
};
