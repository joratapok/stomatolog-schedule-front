import {Typography} from '@mui/material';
import React, {FC, PropsWithChildren} from 'react';
import {TypographyProps} from '@mui/material/Typography/Typography';

export const TypoContent: FC<PropsWithChildren & TypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography variant={'h6'} {...props}>
      {children}
    </Typography>
  );
};
