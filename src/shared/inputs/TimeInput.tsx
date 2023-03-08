import React, {FC} from 'react';
import {Controller, FieldError} from 'react-hook-form';
import {ErrorMessage, MuiInput} from '@box/shared/ui';
import {FormControl, InputLabel} from '@mui/material';
import {TimeMaskInput} from '@box/shared/inputs/MaskInput';

type Props = {
  name: string;
  label: string;
  control: any;
  defaultValue?: string;
  error: FieldError | undefined;
  clearErrors: () => void;
};

export const TimeInput: FC<Props> = ({
  control,
  error,
  name,
  label,
  defaultValue,
  clearErrors,
}) => {
  return (
    <Controller
      rules={{required: true, pattern: /\d{2}:\d{2}/}}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field: {onChange, onBlur, value}}) => {
        const customOnChange = (e: any) => {
          onChange(e);
          clearErrors();
        };
        return (
          <FormControl sx={{mb: 1.5}} variant={'outlined'} fullWidth>
            <InputLabel error={!!error} htmlFor={`${name}-select-label`}>
              {label}
            </InputLabel>
            <MuiInput
              required
              fullWidth
              autoComplete={'off'}
              label={label}
              id={`${name}-select-label`}
              onChange={customOnChange}
              value={value}
              error={!!error}
              onBlur={onBlur}
              autoCapitalize={'none'}
              inputComponent={TimeMaskInput as any}
            />
            <ErrorMessage isError={!!error?.message} message={error?.message} />
          </FormControl>
        );
      }}
    />
  );
};
