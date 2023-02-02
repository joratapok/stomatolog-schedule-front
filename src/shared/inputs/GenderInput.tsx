import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {SelectContainer} from '@box/shared/ui';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

type Props = {
  disabled: boolean;
  control: any;
};

export const GenderInput: FC<Props> = ({control, disabled}) => {
  return (
    <Controller
      rules={{required: true}}
      name={'gender'}
      control={control}
      defaultValue={'male'}
      render={({field: {onChange, onBlur, value}}) => (
        <SelectContainer>
          <FormControl fullWidth>
            <InputLabel id="gender-select-label">Пол</InputLabel>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              disabled={disabled}
              onBlur={onBlur}
              value={value}
              label="Статус"
              onChange={(event) => {
                onChange(event.target.value);
              }}
            >
              <MenuItem value="male">Мужской</MenuItem>
              <MenuItem value="female">Женский</MenuItem>
            </Select>
          </FormControl>
        </SelectContainer>
      )}
    />
  );
};
