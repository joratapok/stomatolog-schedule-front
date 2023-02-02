import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {FormControl, InputLabel} from '@mui/material';
import {MuiInput} from '@box/shared/ui';
import {DateMaskInput} from '@box/shared/inputs';

type Props = {
  control: any;
  error: boolean;
};

export const DateOfBirthInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{required: true}}
      name={'dateOfBirth'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <FormControl variant={'outlined'} fullWidth>
          <InputLabel htmlFor="date-select-label">Дата рождения</InputLabel>
          <MuiInput
            required
            fullWidth
            autoComplete={'off'}
            label={'Дата рождения'}
            id="date-select-label"
            onChange={onChange}
            value={value}
            error={error}
            onBlur={onBlur}
            autoCapitalize={'none'}
            inputComponent={DateMaskInput as any}
          />
        </FormControl>
      )}
    />
  );
};
