import React, {useState} from 'react';
import Calendar from 'react-calendar';
import {StyledCalendarContainer} from './UI/StyledCalendar';
// import 'react-calendar/dist/Calendar.css';

export const SCalendar = () => {
  const [value, onChange] = useState(new Date());

  const calendarHandler = (value: Date) => {
    console.log(value);
  };
  return (
    <StyledCalendarContainer>
      <Calendar
        onClickDay={calendarHandler}
        onClickYear={() => console.log('click year')}
        onClickMonth={() => console.log('click month')}
        onClickDecade={() => console.log('click decade')}
        minDetail={'year'}
        showNeighboringMonth={true}
        locale={'ru-RU'}
        onChange={onChange}
        value={value}
      />
    </StyledCalendarContainer>
  );
};
