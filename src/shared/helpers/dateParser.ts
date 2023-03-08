import {parse} from 'date-fns';
import {DATE_FORMAT} from '@box/shared/constants';

export const dateParser = (dateString: string): Date => {
  return parse(dateString, DATE_FORMAT, new Date());
};
