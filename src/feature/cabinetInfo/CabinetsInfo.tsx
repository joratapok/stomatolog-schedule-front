import {useEventsData} from '@box/shared/hooks';
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
