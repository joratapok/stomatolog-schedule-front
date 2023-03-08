import React, {FC} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {Box} from '@mui/system';
import {ToothBox} from './ToothBox';

type Props = {
  line: string[];
  activeTeeth: number[];
  currentTooth: string;
  pressHandler: (toothNumber: string) => void;
};

export const TeethLine: FC<Props> = ({
  line,
  activeTeeth,
  pressHandler,
  currentTooth,
}) => {
  return (
    <Grid xs={12} md={6}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: {xs: 'center', md: 'flex-start'},
        }}
      >
        {line.map((el) => (
          <ToothBox
            key={el}
            toothNumber={el}
            isActive={activeTeeth.includes(parseInt(el))}
            isSelected={currentTooth === el}
            pressHandler={pressHandler}
          />
        ))}
      </Box>
    </Grid>
  );
};
