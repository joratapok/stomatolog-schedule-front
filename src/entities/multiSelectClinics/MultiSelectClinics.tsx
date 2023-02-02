import * as React from 'react';
import {Theme, useTheme} from '@mui/material/styles';
import {
  OutlinedInput,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';

type Props = {
  clinics: {id: number; name: string}[];
  onBlur: () => void;
  value: number[];
  error: boolean;
  onChange: (e: any) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: number, personName: number[], theme: Theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultiSelectClinics: React.FC<Props> = ({
  clinics,
  onBlur,
  value,
  error,
  onChange,
}) => {
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: {value},
    } = event;
    onChange(value);
  };
  return (
    <div>
      <FormControl fullWidth sx={{minWidth: 300}}>
        <InputLabel id="demo-multiple-name-label">Клиника</InputLabel>
        <Select
          required
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          onBlur={onBlur}
          value={value}
          error={error}
          onChange={handleChange}
          input={<OutlinedInput label="Клиника" />}
          MenuProps={MenuProps}
        >
          {clinics?.map((clinic) => (
            <MenuItem
              key={clinic.id}
              value={clinic.id}
              style={getStyles(clinic.id, value, theme)}
            >
              {clinic.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
