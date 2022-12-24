import type {NextPage} from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import {SCalendar} from '../components/Calendar';
import {TimeTable} from '../components/TimeTable';
import {TablePeriodChanger} from '../components/TablePeriodChanger';
import {ModalsKeeper} from '../components/ModalsKeeper';

/*
  xs, extra-small: 0px
  sm, small: 600px
  md, medium: 900px
  lg, large: 1200px
  xl, extra-large: 1536px
*/

const Home: NextPage = () => {
  return (
    <Grid container xs={12} spacing={{sm: 1, md: 2, lg: 3}}>
      <Grid xs={12} sm={3} sx={{minWidth: '300px', maxWidth: '600px'}}>
        <SCalendar />
        <TablePeriodChanger />
      </Grid>
      <Grid xs={12} sm={true} sx={{minWidth: '300px'}}>
        <TimeTable />
      </Grid>
      <ModalsKeeper />
    </Grid>
  );
};

export default Home;
