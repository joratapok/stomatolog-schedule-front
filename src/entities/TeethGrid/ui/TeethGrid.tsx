import React, {FC} from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {TOOTH_CARD} from '@box/shared/constants';
import {TeethLine} from './TeethLine';

type Props = {
  activeTeeth: number[];
  currentTooth: string;
  toothPressHandler: (tooth: string) => void;
};

const Teeth = [
  TOOTH_CARD.slice(0, 8).reverse(),
  TOOTH_CARD.slice(8, 16),
  TOOTH_CARD.slice(24).reverse(),
  TOOTH_CARD.slice(16, 24),
];

export const TeethGrid: FC<Props> = ({
  activeTeeth,
  currentTooth,
  toothPressHandler,
}) => {
  return (
    <Grid container maxWidth={680} padding={0} spacing={{xs: 1}}>
      {Teeth.map((line, index) => (
        <TeethLine
          line={line}
          key={index}
          activeTeeth={activeTeeth}
          currentTooth={currentTooth}
          pressHandler={toothPressHandler}
        />
      ))}
    </Grid>
  );
};
