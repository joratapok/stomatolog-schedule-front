import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {FormControl, InputLabel} from '@mui/material';
import {MuiInput} from '@box/shared/ui';
import {PhoneMaskInput} from '@box/shared/inputs';

type Props = {
  control: any;
  error: boolean;
};

export const PhoneInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{required: true}}
      name={'phone'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <FormControl variant={'outlined'} fullWidth>
          <InputLabel htmlFor="phone-select-label">Телефон</InputLabel>
          <MuiInput
            required
            fullWidth
            autoComplete={'off'}
            label={'Телефон'}
            id="phone-select-label"
            onChange={onChange}
            value={value}
            error={error}
            onBlur={onBlur}
            autoCapitalize={'none'}
            inputComponent={PhoneMaskInput as any}
          />
        </FormControl>
      )}
    />
  );
};
