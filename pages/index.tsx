import type { NextPage } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import {Typography} from '@mui/material';
import {SCalendar} from '../components/Calendar';

const Home: NextPage = () => {
  return (
    <Grid container>
      <Grid xs={12} sm={3}>
        <SCalendar />
      </Grid>
      <Grid xs={12} sm={9} sx={{bgcolor: 'pink'}}>
        <Typography>Some text</Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
