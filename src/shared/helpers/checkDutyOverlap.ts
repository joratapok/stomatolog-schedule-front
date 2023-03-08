import {IDutyShift} from '@box/shared/models';
import {dateParser} from '@box/shared/helpers/dateParser';
import {areIntervalsOverlapping} from 'date-fns';

export const checkDutyOverlap = (
  duties: IDutyShift[],
  newDutyStart: Date,
  newDutyFinish: Date
) => {
  if (!duties.length) {
    return;
  }
  return duties.find((el) => {
    const start = dateParser(el.dateStart);
    const end = dateParser(el.dateFinish);
    return areIntervalsOverlapping(
      {start, end},
      {start: newDutyStart, end: newDutyFinish}
    );
  });
};
