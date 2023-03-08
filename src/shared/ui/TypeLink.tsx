import {Typography} from '@mui/material';
import React, {FC, PropsWithChildren} from 'react';
import {TypographyProps} from '@mui/material/Typography/Typography';

type Props = {
  isDisabled?: boolean;
  bold?: boolean;
};

export const TypoLink: FC<Props & PropsWithChildren & TypographyProps> = ({
  children,
  bold,
  ...props
}) => {
  return (
    <Typography
      sx={(theme) => ({
        color: theme.palette.primary.main,
        cursor: 'pointer',
        fontWeight: bold ? 'bold' : undefined,
      })}
      variant={'h6'}
      {...props}
    >
      {children}
    </Typography>
  );
};
