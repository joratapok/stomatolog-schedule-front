import React, {FC} from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {Control, Controller} from 'react-hook-form';
import {SelectContainer} from '@box/shared/ui';

type Props = {
  control: Control<any>;
  setIsDoctor: (value: boolean) => void;
};

const Roles = [
  {value: 'doctor', label: 'Доктор'},
  {value: 'administrator', label: 'Администратор'},
];

export const RoleInput: FC<Props> = ({control, setIsDoctor}) => {
  return (
    <Controller
      rules={{required: true}}
      name={'role'}
      control={control}
      defaultValue={'doctor'}
      render={({field: {onChange, onBlur, value}}) => (
        <SelectContainer>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Выбор Роли</InputLabel>
            <Select
              labelId="role-select-label"
              id="status-select"
              value={value}
              label="Выбор Зуба"
              onChange={(event: SelectChangeEvent<string>) => {
                onChange(event?.target?.value);
                setIsDoctor(event?.target?.value === 'doctor');
              }}
            >
              {Roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
      )}
    />
  );
};
