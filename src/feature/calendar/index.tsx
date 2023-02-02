import React, {useCallback, useEffect} from 'react';
import {Calendar} from 'react-calendar';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';

import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {calendarSlice} from '@box/shared/store/reducers';
import {StyledCalendarV2} from './ui/StyledCalendarV2';
// import {StyledCalendarContainer} from './UI/StyledCalendar';

/*
  yyyy - 2022 yy - 22
  MMMM - January  MM - 01 - 12 month
  dd - 01 - 31  d - 1 -31  EEEE - Monday
  HH - 01 - 24 hours
  mm - 01 - 59 minutes
  xxx - +03:00
 */

export const SCalendar = () => {
  const {date} = useAppSelector((state) => state.calendarSlice);
  const dispatch = useAppDispatch();
  const {setDate} = calendarSlice.actions;

  const calendarHandler = useCallback((value: Date) => {
    const dateText = format(value, 'do MMMM', {locale: ru});
    dispatch(setDate({date: value.getTime(), dateText}));
  }, []);

  useEffect(() => {
    calendarHandler(new Date(date));
  }, []);
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
