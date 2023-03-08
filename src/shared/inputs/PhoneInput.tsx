import React, {FC} from 'react';
import {Controller, FieldError} from 'react-hook-form';
import {FormControl, InputLabel} from '@mui/material';
import {ErrorMessage, MuiInput} from '@box/shared/ui';
import {PhoneMaskInput} from '@box/shared/inputs';

type Props = {
  control: any;
  error: FieldError | undefined;
  disabled?: boolean;
};

export const PhoneInput: FC<Props> = ({control, error, disabled}) => {
  return (
    <Controller
      rules={{required: true, pattern: /\d\s\(\d{3}\)-\d{3}-\d{4}/}}
      name={'phone'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <FormControl sx={{mb: 1.5}} variant={'outlined'} fullWidth>
          <InputLabel error={!!error} htmlFor="phone-select-label">
            Телефон
          </InputLabel>
          <MuiInput
            required
            fullWidth
            disabled={disabled}
            autoComplete={'off'}
            label={'Телефон'}
            id="phone-select-label"
            onChange={onChange}
            value={value}
            error={!!error}
            onBlur={onBlur}
            autoCapitalize={'none'}
            inputComponent={PhoneMaskInput as any}
          />
          <ErrorMessage isError={!!error?.message} message={error?.message} />
        </FormControl>
      )}
    />
  );
};
