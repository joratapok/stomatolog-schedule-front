import React, {useCallback, useMemo} from 'react';
import {
  addMinutes,
  format,
  isWithinInterval,
  parse,
  differenceInMinutes,
  areIntervalsOverlapping,
} from 'date-fns';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import {TimeCell} from './UI/table/TimeCell';
import {EventRow} from './UI/table/EventRow';
import {EventCell} from './UI/table/EventCell';
import {NoBorderCell} from './UI/table/NoBorderCell';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {EventAbsolute} from './UI/table/EventAbsolute';
import {eventSlice} from '../store/reducers/eventSlice';
import {useEventsData} from '../hooks/useEventsData';
import {CELL_HEIGHT} from '../constants/tableSize';
import {DATE_FORMAT} from '../constants/dateFormat';
import {Cabinet, CabinetEvent, IDutyShift} from '../models/IEvents';
import {dateParser} from '../helpers/dateParser';
import {doctorFinder} from '../helpers/doctorFinder';

export const TimeTable = () => {
  const dispatch = useAppDispatch();
  const {tablePeriod: period} = useAppSelector((state) => state.eventSlice);
  const {
    initCreateEvent,
    showModal,
    showCreatorDuty,
    initNewDuty,
    showEventDetails,
    setEventDetails,
  } = eventSlice.actions;
  const {dateText, date: currentDate} = useAppSelector(
    (state) => state.calendarSlice
  );
  const {cabinets, clinicInfo, doctors} = useEventsData();

  const {timeFrom, timeUntil} = useMemo(() => {
    const timeFrom = parse(
      clinicInfo?.startOfTheDay ?? '08:00',
      'HH:mm',
      new Date(currentDate)
    );
    const timeUntil = parse(
      clinicInfo?.endOfTheDay ?? '17:00',
      'HH:mm',
      new Date(currentDate)
    );
    return {timeFrom, timeUntil};
  }, [currentDate, clinicInfo]);

  const minutesWorked = differenceInMinutes(timeUntil, timeFrom);
  const countRows = Math.ceil(minutesWorked / period);
  const timeInRows = useMemo(() => {
    return new Array(countRows).fill(0).map((_, i) => {
      const startInterval = addMinutes(timeFrom, period * i);
      const finishInterval = addMinutes(timeFrom, period * i + period - 1);
      const timeString = format(startInterval, 'HH:mm');
      return {startInterval, finishInterval, timeString};
    });
  }, [cabinets, period]);

  const createEvent = useCallback(
    (start: Date, cabinet: Cabinet, dutyShift: IDutyShift | undefined) => {
      const dateString = format(start, DATE_FORMAT);
      dispatch(
        initCreateEvent({
          timeStart: dateString,
          cabinet,
          doctor: dutyShift?.doctor,
        })
      );
      dispatch(showModal());
    },
    []
  );
  const createDuty = useCallback((cabinet: Cabinet) => {
    dispatch(initNewDuty(cabinet));
    dispatch(showCreatorDuty());
  }, []);
  const showModalEventDetails = useCallback(
    (event: CabinetEvent, cabinetName: string) => {
      dispatch(setEventDetails({event, cabinet: cabinetName}));
      dispatch(showEventDetails());
    },
    []
  );
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 300}} aria-label="simple table">
        <TableHead>
          <TableRow sx={{borderBottom: '0px solid'}}>
            <NoBorderCell sx={{width: '50px'}} />
            <NoBorderCell colSpan={12} align="center">
              <Typography variant={'h5'}>{dateText}</Typography>
            </NoBorderCell>
          </TableRow>
          <TableRow sx={{border: '0px'}}>
            <NoBorderCell sx={{width: '50px'}} />
            {cabinets?.map((el) => (
              <NoBorderCell key={el.id} align="center">
                <Typography variant={'h6'}>{el.name}</Typography>
                <Tooltip placement={'right'} title="Добавить смену">
                  <IconButton
                    onClick={() => createDuty(el)}
                    color="primary"
                    aria-label="add duty"
                  >
                    <MoreTimeIcon />
                  </IconButton>
                </Tooltip>
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
                {cabinets?.map((cabinet) => {
                  const dutyShift = cabinet.dutyShift.find(
                    (duty: IDutyShift) => {
                      const dutyStart = dateParser(duty.dateStart);
                      const dutyFinish = dateParser(duty.dateFinish);
                      return areIntervalsOverlapping(
                        {start, end},
                        {start: dutyStart, end: dutyFinish}
                      );
                    }
                  );
                  return (
                    <EventCell
                      isonduty={!!dutyShift ? 'true' : undefined}
                      onClick={() => createEvent(start, cabinet, dutyShift)}
                      align="center"
                      key={`${cabinet.id}`}
                    >
                      {!!dutyShift && (
                        <Typography>
                          {doctorFinder(dutyShift.doctor, doctors)}
                        </Typography>
                      )}
                      {cabinet?.cabinetEvents?.map((el) => {
                        const eventStart = dateParser(el.dateStart);
                        const eventFinish = dateParser(el.dateFinish);
                        if (isWithinInterval(eventStart, {start, end})) {
                          const textStart = format(eventStart, 'HH:mm');
                          const textFinish = format(eventFinish, 'HH:mm');
                          const eventMinutes = differenceInMinutes(
                            eventFinish,
                            eventStart
                          );
                          const heightFactor = eventMinutes / period;
                          const startDiff = differenceInMinutes(
                            eventStart,
                            start
                          );
                          const topOffsetFactor = startDiff / period;
                          return (
                            <EventAbsolute
                              key={el.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                showModalEventDetails(el, cabinet.name);
                              }}
                              sx={{
                                height: heightFactor * CELL_HEIGHT - 4,
                                top: topOffsetFactor * CELL_HEIGHT + 2,
                              }}
                            >
                              <Typography variant={'reverse'}>
                                {`${el.client.lastName} ${textStart} - ${textFinish} ${el.service}`}
                              </Typography>
                            </EventAbsolute>
                          );
                        }
                      })}
                    </EventCell>
                  );
                })}
              </EventRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
