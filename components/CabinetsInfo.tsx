import {useEventsData} from '../hooks/useEventsData';
import {Typography} from '@mui/material';

export const CabinetsInfo = () => {
  const {cabinets} = useEventsData();
  return (
    <>
      {cabinets.map((cabinet) => (
        <Typography key={cabinet.id}>{cabinet.name}</Typography>
      ))}
    </>
  );
};
