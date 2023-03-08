import React, {FC} from 'react';
import {SelectContainer} from '@box/shared/ui';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {TOOTH_CARD} from '@box/shared/constants';

type Props = {
  toothNumber: number;
  onChangeRequest: (tooth: number) => void;
};

export const ToothNumInput: FC<Props> = ({toothNumber, onChangeRequest}) => {
  return (
    <SelectContainer>
      <FormControl fullWidth>
        <InputLabel id="status-select-label">Выбор Зуба</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={toothNumber}
          label="Выбор Зуба"
          onChange={(event: SelectChangeEvent<number>) => {
            onChangeRequest(Number(event?.target?.value));
          }}
        >
          {TOOTH_CARD.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectContainer>
  );
};
