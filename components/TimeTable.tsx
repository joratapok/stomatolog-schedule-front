import React, {useMemo} from 'react';
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
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {Typography} from '@mui/material';
import {EventAbsolute} from './UI/table/EventAbsolute';
import {CELL_HEIGHT} from '../constants/tableSize';
import {eventSlice} from '../store/reducers/eventSlice';
import {useGetEventsQuery} from '../services/events.api';

// const mockEvents = [
//   {
//     id: 1,
//     dateStart: parse('11:10', 'HH:mm', new Date()),
//     dateFinish: parse('12:40', 'HH:mm', new Date()),
//   },
//   {
//     id: 2,
//     dateStart: parse('12:55', 'HH:mm', new Date()),
//     dateFinish: parse('13:55', 'HH:mm', new Date()),
//   },
//   {
//     id: 3,
//     dateStart: parse('15:30', 'HH:mm', new Date()),
//     dateFinish: parse('17:00', 'HH:mm', new Date()),
//   },
// ];
//
// const cabinets = [
//   {id: 0, name: 'Кабинет 1, Врач 1'},
//   {id: 1, name: 'Кабинет 2, Врач 2'},
//   {id: 2, name: 'Кабинет 3, Врач 3'},
// ];

export const TimeTable = () => {
  const dispatch = useAppDispatch();
  const {setInitialEvent, showModal} = eventSlice.actions;
  const {accessToken} = useAppSelector((state) => state.authSlice);
  const {dateText, date: currentDate} = useAppSelector(
    (state) => state.calendarSlice
  );
  const dateForFetch = useMemo(() => {
    return format(new Date(currentDate), 'dd-MM-yyyy');
  }, [currentDate]);
  const {data} = useGetEventsQuery(dateForFetch, {skip: !accessToken});
  const cabinets = useMemo(() => {
    return data && data[0]?.cabinets;
  }, [data]);

  const period = 30;

  const timeFrom = useMemo(() => {
    return parse('08:00', 'HH:mm', new Date(currentDate));
  }, [currentDate]);
  const timeUntil = useMemo(() => {
    return parse('17:00', 'HH:mm', new Date(currentDate));
  }, [currentDate]);

  const minutesWorked = differenceInMinutes(timeUntil, timeFrom);
  const countRows = Math.ceil(minutesWorked / period);
  const timeInRows = useMemo(() => {
    return new Array(countRows).fill(0).map((_, i) => {
      const startInterval = addMinutes(timeFrom, period * i);
      const finishInterval = addMinutes(timeFrom, period * i + period - 1);
      const timeString = format(startInterval, 'HH:mm');
      return {startInterval, finishInterval, timeString};
    });
  }, [data]);

  const createEvent = (start: Date, cabinetId: number) => {
    dispatch(setInitialEvent({timeStart: start.getTime(), cabinetId}));
    dispatch(showModal());
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 300}} aria-label="simple table">
        <TableHead>
          <TableRow sx={{borderBottom: '0px solid'}}>
            <NoBorderCell sx={{width: '50px'}} />
            <NoBorderCell colSpan={2} align="center">
              <Typography variant={'h5'}>{dateText}</Typography>
            </NoBorderCell>
          </TableRow>
          <TableRow sx={{border: '0px'}}>
            <NoBorderCell sx={{width: '50px'}} />
            {cabinets?.map((el) => (
              <NoBorderCell key={el.id} align="center">
                {el.name}
              </NoBorderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{position: 'relative'}}>
          {timeInRows.map(
            ({timeString, startInterval: start, finishInterval: end}) => (
              <EventRow key={timeString}>
                <TimeCell align="center" component="th" scope="row">
                  {timeString}
                </TimeCell>
                {cabinets?.map((cabinet) => (
                  <EventCell
                    onClick={() => createEvent(start, cabinet.id)}
                    key={`${cabinet.id}`}
                  >
                    {cabinet?.cabinetEvents?.map((el) => {
                      if (
                        isWithinInterval(new Date(el.dateStart), {start, end})
                      ) {
                        const eventMinutes = differenceInMinutes(
                          new Date(el.dateFinish),
                          new Date(el.dateStart)
                        );
                        const heightFactor = eventMinutes / period;
                        const startDiff = differenceInMinutes(
                          new Date(el.dateStart),
                          start
                        );
                        const topOffsetFactor = startDiff / period;
                        return (
                          <EventAbsolute
                            key={el.id}
                            sx={{
                              height: heightFactor * CELL_HEIGHT - 4,
                              top: topOffsetFactor * CELL_HEIGHT + 2,
                            }}
                          />
                        );
                      }
                    })}
                  </EventCell>
                ))}
              </EventRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
