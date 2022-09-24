import React from 'react';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import {addMinutes, format, isWithinInterval} from 'date-fns';
import parse from 'date-fns/parse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TimeCell} from './UI/table/TimeCell';
import {EventRow} from './UI/table/EventRow';
import {EventCell} from './UI/table/EventCell';
import {NoBorderCell} from './UI/table/NoBorderCell';
import {useAppSelector} from '../hooks/redux';
import {Typography} from '@mui/material';
import {EventAbsolute} from './UI/table/EventAbsolute';
import {CELL_HEIGHT} from '../constants/tableSize';

const mockEvents = [
  {
    id: 1,
    dateStart: parse('11:10', 'HH:mm', new Date()),
    dateFinish: parse('12:40', 'HH:mm', new Date()),
  },
  {
    id: 2,
    dateStart: parse('12:55', 'HH:mm', new Date()),
    dateFinish: parse('13:55', 'HH:mm', new Date()),
  },
];

const cabinets = [
  'Кабинет 1, Врач 1',
  'Кабинет 2, Врач 2',
  'Кабинет 3, Врач 1',
  'Кабинет 4, Врач 2',
  'Кабинет 5, Врач 1',
  'Кабинет 6, Врач 2',
];

export const TimeTable = () => {
  const {dateText} = useAppSelector(state => state.eventSlice);

  const period = 30;
  const timeFrom = parse('08:00', 'HH:mm', new Date());
  const timeUntil = parse('17:00', 'HH:mm', new Date());
  const minutesWorked = differenceInMinutes(timeUntil, timeFrom);
  const countRows = Math.ceil(minutesWorked / period);
  const timeInRows = new Array(countRows).fill('').map((_, i) => {
    const startInterval = addMinutes(timeFrom, period * i);
    const finishInterval = addMinutes(timeFrom, period * i + period - 1);
    const timeString = format(startInterval, 'HH:mm');
    return {startInterval, finishInterval, timeString};
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{borderBottom: '0px solid'}}>
            <NoBorderCell sx={{width: '50px'}} />
            <NoBorderCell colSpan={2} align="center">
              <Typography variant={'h5'}>{dateText}</Typography>
            </NoBorderCell>
          </TableRow>
          <TableRow sx={{border: '0px'}}>
            <NoBorderCell sx={{width: '50px'}} />
            {cabinets.map(el =>
              <NoBorderCell key={el} align="center">{el}</NoBorderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody sx={{position: 'relative'}}>
          {timeInRows.map(({timeString,
            startInterval: start,
            finishInterval: end}) => (
            <EventRow key={timeString}>
              <TimeCell align="center" component="th" scope="row">
                {timeString}
              </TimeCell>
              {cabinets.map(cabinet =>
                <EventCell key={`${timeString}${cabinet}`}>
                  {mockEvents.map(el => {
                    if (isWithinInterval(el.dateStart, {start, end})) {
                      const eventMinutes = differenceInMinutes(el.dateFinish, el.dateStart);
                      const heightFactor = eventMinutes / period;
                      const startDiff = differenceInMinutes(el.dateStart, start);
                      const topOffsetFactor = startDiff / period;
                      return <EventAbsolute
                        key={el.id}
                        sx={{height: heightFactor*CELL_HEIGHT-4, top: topOffsetFactor*CELL_HEIGHT+2}}
                      />;
                    }
                  })}
                </EventCell>
              )}
            </EventRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
