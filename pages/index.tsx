import type {NextPage} from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import {SCalendar} from '../components/Calendar';
import {TimeTable} from '../components/TimeTable';
import {EventCreator} from '../components/modals/EventCreator';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {eventSlice} from '../store/reducers/eventSlice';

/*
  xs, extra-small: 0px
  sm, small: 600px
  md, medium: 900px
  lg, large: 1200px
  xl, extra-large: 1536px
*/

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const {closeModal} = eventSlice.actions;
  const {isVisibleModal} = useAppSelector((state) => state.eventSlice);
  const onCloseRequest = () => {
    dispatch(closeModal());
  };
  return (
    <Grid container xs={12} spacing={{sm: 1, md: 2, lg: 3}}>
      <Grid xs={12} sm={3} sx={{minWidth: '300px', maxWidth: '600px'}}>
        <SCalendar />
      </Grid>
      <Grid xs={12} sm={true}>
        <TimeTable />
      </Grid>
      <EventCreator
        isVisible={isVisibleModal}
        onCloseRequest={onCloseRequest}
      />
    </Grid>
  );
};

export default Home;
