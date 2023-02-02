import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {SelectContainer} from '@box/shared/ui';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {EventStatus} from '@box/shared/models';
import {statusSwitch} from '@box/shared/helpers';

type Props = {
  control: any;
  defaultValue?: EventStatus;
};

export const EventStatusInput: FC<Props> = ({control, defaultValue}) => {
  return (
    <Controller
      rules={{required: true}}
      name={'status'}
      control={control}
      defaultValue={defaultValue ?? EventStatus.NOT_CONFIRMED}
      render={({field: {onChange, onBlur, value}}) => (
        <SelectContainer>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">статус</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              onBlur={onBlur}
              value={value}
              label="Статус"
              onChange={(event) => {
                onChange(event.target.value);
              }}
            >
              {Object.values(EventStatus).map((s) => (
                <MenuItem key={s} value={s}>
                  {statusSwitch(s)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
      )}
    />
  );
};
