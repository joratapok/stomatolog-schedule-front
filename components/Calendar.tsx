import React, {useCallback, useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import {StyledCalendarContainer} from './UI/StyledCalendar';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {eventSlice} from '../store/reducers/eventSlice';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import {StyledCalendarV2} from './UI/StyledCalendarV2';
// import 'react-calendar/dist/Calendar.css';

/*
  yyyy - 2022 yy - 22
  MMMM - January  MM - 01 - 12 month
  dd - 01 - 31  d - 1 -31  EEEE - Monday
  HH - 01 - 24 hours
  mm - 01 - 59 minutes
 */

export const SCalendar = () => {
  const {date} = useAppSelector(state => state.eventSlice);
  const dispatch = useAppDispatch();
  const {setDate} = eventSlice.actions;

  const calendarHandler = useCallback((value: Date) => {
    const dateText = format(value, 'do MMMM', {locale: ru});
    dispatch(setDate({date: value.getTime(), dateText}));
  }, []);

  useEffect(() => {
    calendarHandler(new Date(date));
  },[]);
  return (
    <>
      {/*<StyledCalendarContainer>*/}
      {/*  <Calendar*/}
      {/*    minDetail={'year'}*/}
      {/*    showNeighboringMonth={true}*/}
      {/*    locale={'ru-RU'}*/}
      {/*    onChange={calendarHandler}*/}
      {/*    value={new Date(date)}*/}
      {/*  />*/}
      {/*</StyledCalendarContainer>*/}
      <StyledCalendarV2>
        <Calendar
          minDetail={'year'}
          showNeighboringMonth={true}
          locale={'ru-RU'}
          onChange={calendarHandler}
          value={new Date(date)}
        />
      </StyledCalendarV2>
    </>

  );
};
