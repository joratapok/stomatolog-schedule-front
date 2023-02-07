import React, {FC} from 'react';
import {FormHelperText} from '@mui/material';

interface Props {
  isError: boolean;
  message?: string;
  inCenter?: boolean;
}

export const ErrorMessage: FC<Props> = ({isError, message, inCenter}) => {
  if (!isError || !message) {
    return null;
  }
  return (
    <FormHelperText
      sx={{textAlign: inCenter ? 'center' : 'left'}}
      variant={'outlined'}
      error
    >
      {message}
    </FormHelperText>
  );
};
