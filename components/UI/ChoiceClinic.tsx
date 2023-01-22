import {useAppDispatch} from '../../hooks/redux';
import {useEventsData} from '../../hooks/useEventsData';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {SelectContainer} from './SelectContainer';
import React from 'react';
import {eventSlice} from '../../store/reducers/eventSlice';

export const ChoiceClinic = () => {
  const dispatch = useAppDispatch();
  const {data: clinics, clinic} = useEventsData();
  const {setActiveClinic} = eventSlice.actions;
  if (clinics?.length && clinics.length > 1) {
    return (
      <>
        <Typography sx={{my: 1}} variant={'h6'}>
          Выбор клиники
        </Typography>
        <SelectContainer>
          <FormControl size="small" fullWidth>
            <InputLabel id="doctor-label">Клиника</InputLabel>
            <Select
              labelId="doctor-label"
              id="doctor-select"
              value={clinic?.id ?? 0}
              label="Клиника"
              onChange={(event) => {
                dispatch(setActiveClinic(Number(event.target.value)));
              }}
            >
              {clinics?.map((clinic) => (
                <MenuItem key={clinic.id} value={clinic.id}>
                  {clinic.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
      </>
    );
  } else {
    return null;
  }
};
