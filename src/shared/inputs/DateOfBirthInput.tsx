import React, {FC} from 'react';
import {Controller, FieldError} from 'react-hook-form';
import {FormControl, InputLabel} from '@mui/material';
import {ErrorMessage, MuiInput} from '@box/shared/ui';
import {DateMaskInput} from '@box/shared/inputs';

type Props = {
  control: any;
  error: FieldError | undefined;
};

export const DateOfBirthInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{required: true, pattern: /\d{4}-\d{2}-\d{2}/}}
      name={'dateOfBirth'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <FormControl sx={{mb: 1.5}} variant={'outlined'} fullWidth>
          <InputLabel error={!!error} htmlFor="date-select-label">
            Дата рождения
          </InputLabel>
          <MuiInput
            required
            fullWidth
            autoComplete={'off'}
            label={'Дата рождения'}
            id="date-select-label"
            onChange={onChange}
            value={value}
            error={!!error}
            onBlur={onBlur}
            autoCapitalize={'none'}
            inputComponent={DateMaskInput as any}
          />
          <ErrorMessage isError={!!error?.message} message={error?.message} />
        </FormControl>
      )}
    />
  );
};
