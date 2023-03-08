import React, {useCallback} from 'react';
import {format} from 'date-fns';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {eventSlice} from '@box/shared/store/reducers';
import {DATE_FORMAT} from '@box/shared/constants';
import {useEventsData} from '@box/shared/hooks';
import {CabinetEvent, ICabinet, IDutyShift} from '@box/shared/models';
import {NoBorderCell} from '@box/shared/ui';
import {CabinetHeaderCell} from '@box/feature/timeTableCells/ui/CabinetHeaderCell';
import {TimeTableBody} from '@box/feature/timeTableCells/ui/TimeTableBody';

export const TimeTable = () => {
  const dispatch = useAppDispatch();
  const {
    initCreateEvent,
    showModal,
    showCreatorDuty,
    initNewDuty,
    showEventDetails,
    setEventDetails,
  } = eventSlice.actions;
  const {dateText} = useAppSelector((state) => state.calendarSlice);
  const {cabinets} = useEventsData();

  const createEvent = useCallback(
    (start: Date, cabinet: ICabinet, dutyShift: IDutyShift | undefined) => {
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
  const createDuty = useCallback((cabinet: ICabinet) => {
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
              <Typography variant={'h4'}>{dateText}</Typography>
            </NoBorderCell>
          </TableRow>
          <TableRow sx={{border: '0px'}}>
            <NoBorderCell sx={{width: '50px'}} />
            {cabinets?.map((el) => (
              <CabinetHeaderCell
                key={el.id}
                cabinet={el}
                createDuty={createDuty}
                width={`${100 / cabinets.length}%`}
              />
            ))}
            {!cabinets.length && (
              <NoBorderCell colSpan={12} align="center">
                <Typography variant={'h4'}>В клинике нет кабинетов</Typography>
              </NoBorderCell>
            )}
          </TableRow>
        </TableHead>

        <TimeTableBody
          createEvent={createEvent}
          showModalEventDetails={showModalEventDetails}
        />
      </Table>
    </TableContainer>
  );
};
