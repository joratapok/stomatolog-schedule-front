import React, {FC} from 'react';
import {Control, Controller, FieldError} from 'react-hook-form';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {IDoctor} from '@box/shared/models';
import {ErrorMessage, SelectContainer} from '@box/shared/ui';

type Props = {
  doctor: number;
  doctors: IDoctor[];
  control: Control<any>;
  error: FieldError | undefined;
};

export const DoctorInput: FC<Props> = ({control, doctor, doctors, error}) => {
  return (
    <Controller
      rules={{required: true}}
      name={'doctor'}
      control={control}
      defaultValue={doctor}
      render={({field: {onChange, onBlur, value}}) => (
        <SelectContainer>
          <FormControl fullWidth>
            <InputLabel error={!!error} id="doctor-label">
              Врач
            </InputLabel>
            <Select
              required
              error={!!error}
              labelId="doctor-label"
              id="doctor-select"
              onBlur={onBlur}
              value={value}
              label="Врач"
              onChange={(event) => {
                onChange(event.target.value);
              }}
            >
              {doctors?.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.lastName}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage isError={!!error?.message} message={error?.message} />
          </FormControl>
        </SelectContainer>
      )}
    />
  );
};
