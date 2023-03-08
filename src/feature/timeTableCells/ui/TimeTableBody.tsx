import React, {FC, useMemo} from 'react';
import {addMinutes, differenceInMinutes, format, parse} from 'date-fns';
import {TableBody} from '@mui/material';
import {EventCellContainer} from '@box/feature/timeTableCells';
import {useAppSelector} from '@box/shared/store/hooks';
import {useEventsData} from '@box/shared/hooks';
import {CabinetEvent, ICabinet, IDutyShift} from '@box/shared/models';
import {EventRow, TimeCell, TypoContent} from '@box/shared/ui';

type Props = {
  createEvent: (
    start: Date,
    cabinet: ICabinet,
    dutyShift: IDutyShift | undefined
  ) => void;
  showModalEventDetails: (event: CabinetEvent, cabinetName: string) => void;
};

export const TimeTableBody: FC<Props> = ({
  createEvent,
  showModalEventDetails,
}) => {
  const {tablePeriod: period, roundTheClock} = useAppSelector(
    (state) => state.eventSlice
  );
  const {date: currentDate} = useAppSelector((state) => state.calendarSlice);
  const {cabinets, clinicInfo, doctors} = useEventsData();
  const {timeFrom, timeUntil} = useMemo(() => {
    const timeFrom = parse(
      roundTheClock ? '00:00' : clinicInfo?.startOfTheDay ?? '08:00',
      'HH:mm',
      new Date(currentDate)
    );
    const timeUntil = parse(
      roundTheClock ? '23:59' : clinicInfo?.endOfTheDay ?? '17:00',
      'HH:mm',
      new Date(currentDate)
    );
    return {timeFrom, timeUntil};
  }, [currentDate, clinicInfo, roundTheClock]);

  const minutesWorked = differenceInMinutes(timeUntil, timeFrom);
  const countRows = Math.ceil(minutesWorked / period);
  const timeInRows = useMemo(() => {
    return new Array(countRows).fill(0).map((_, i) => {
      const startInterval = addMinutes(timeFrom, period * i);
      const finishInterval = addMinutes(timeFrom, period * i + period - 1);
      const timeString = format(startInterval, 'HH:mm');
      return {startInterval, finishInterval, timeString};
    });
  }, [period, timeFrom, timeUntil]);

  return (
    <TableBody sx={{position: 'relative'}}>
      {timeInRows.map(
        ({timeString, startInterval: start, finishInterval: end}) => (
          <EventRow key={timeString}>
            <TimeCell align="center" component="th" scope="row">
              <TypoContent>{timeString}</TypoContent>
            </TimeCell>
            {cabinets?.map((cabinet) => {
              return (
                <EventCellContainer
                  key={cabinet.id}
                  cabinet={cabinet}
                  start={start}
                  end={end}
                  period={period}
                  doctors={doctors}
                  createEvent={createEvent}
                  showModalEventDetails={showModalEventDetails}
                />
              );
            })}
          </EventRow>
        )
      )}
    </TableBody>
  );
};
