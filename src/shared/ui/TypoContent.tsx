import {Typography} from '@mui/material';
import React, {FC, PropsWithChildren} from 'react';
import {TypographyProps} from '@mui/material/Typography/Typography';

type Props = {
  isDisabled?: boolean;
};

export const TypoContent: FC<Props & PropsWithChildren & TypographyProps> = ({
  children,
  isDisabled,
  ...props
}) => {
  return (
    <Typography
      sx={{
        color: isDisabled ? 'text.disabled' : 'text.primary',
      }}
      variant={'h6'}
      {...props}
    >
      {children}
    </Typography>
  );
};
