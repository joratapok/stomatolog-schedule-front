import type {NextPage} from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import {TimeTable} from '@box/widgets/timeTable';
import {TablePeriodChanger} from '@box/widgets/tablePeriodChanger';
import {SCalendar} from '@box/feature/calendar';
import {ModalsKeeper} from '@box/widgets/modalsKeeper';
import NonSSRWrapper from '@box/shared/helpers/SafeHydrate';

const Home: NextPage = () => {
  return (
    <Grid container xs={12} spacing={{sm: 1, md: 2, lg: 3}}>
      <Grid xs={12} sm={3} sx={{minWidth: '300px', maxWidth: '600px'}}>
        <NonSSRWrapper>
          <SCalendar />
        </NonSSRWrapper>
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
