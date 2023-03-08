import {FC} from 'react';
import {TypoContent} from '@box/shared/ui';
import {Box} from '@mui/material';

type Props = {
  teethPlan: {tooth: number; plan: string}[];
};

export const PlanPresent: FC<Props> = ({teethPlan}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>
      {teethPlan.map((el) => (
        <TypoContent key={el.tooth}>
          {el.tooth}: {el.plan}
        </TypoContent>
      ))}
    </Box>
  );
};
