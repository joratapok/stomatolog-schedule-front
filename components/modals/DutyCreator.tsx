import React, {useEffect} from 'react';
import {parse} from 'date-fns';
import {
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import {CloseButton} from '../UI/buttons/CloseButton';
import {useAppSelector} from '../../hooks/redux';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {MuiInput} from '../UI/EventInput';
import {TimeMaskInput} from '../MaskInput';
import {SubmitButton} from '../UI/buttons/SubmitButton';
import {SelectContainer} from '../UI/SelectContainer';
import {useEventsData} from '../../hooks/useEventsData';
import {useCreateDutyShiftMutation} from '../../services/events.api';
import {IDutyShift} from '../../models/IEvents';
import {stringDateCreator} from '../../helpers/stringDateCreator';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  minWidth: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  dateStart: string;
  dateFinish: string;
  doctor: number;
};

export const DutyCreator: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const {
      newDuty: {cabinetName, cabinetId},
    } = useAppSelector((state) => state.eventSlice);
    const {dateText, date: currentDate} = useAppSelector(
      (state) => state.calendarSlice
    );
    const {doctors} = useEventsData();
    const [createDuty, {isLoading, isError, error, isSuccess, reset}] =
      useCreateDutyShiftMutation();
    const {
      setValue,
      setError,
      control,
      handleSubmit,
      reset: resetForm,
      formState: {errors},
    } = useForm<FormState>();
    const closeModal = () => {
      resetForm();
      onCloseRequest();
    };
    const onSubmit: SubmitHandler<FormState> = (data) => {
      const dutyInfo: IDutyShift = {
        cabinet: cabinetId,
        dateStart: '',
        dateFinish: '',
        doctor: data.doctor,
      };
      try {
        const dateFrom = parse(data.dateStart, 'HH:mm', new Date(currentDate));
        const dateFinish = parse(
          data.dateFinish,
          'HH:mm',
          new Date(currentDate)
        );
        dutyInfo.dateStart = stringDateCreator(dateFrom);
        dutyInfo.dateFinish = stringDateCreator(dateFinish);
      } catch {
        setError('dateStart', {type: 'custom', message: 'Неправильный формат'});
        console.log('pars err');
      }
      if (dutyInfo.dateStart && dutyInfo.dateFinish) {
        createDuty(dutyInfo);
      } else {
        console.log('date error');
      }
    };

    useEffect(() => {
      if (isSuccess) {
        reset();
        closeModal();
      }
    }, [isSuccess]);
    return (
      <Modal
        open={isVisible}
        onClose={(e, reason) => {
          if (reason === 'backdropClick') {
            return;
          }
          closeModal();
        }}
      >
        <Box sx={style}>
          <Typography>Кабинет: {cabinetName}</Typography>

          <Controller
            rules={{required: true}}
            name={'doctor'}
            control={control}
            defaultValue={(doctors && doctors[0]?.id) ?? 0}
            render={({field: {onChange, onBlur, value}}) => (
              <SelectContainer>
                <FormControl fullWidth>
                  <InputLabel id="doctor-label">Врач</InputLabel>
                  <Select
                    labelId="doctor-label"
                    id="doctor-select"
                    onBlur={onBlur}
                    value={value}
                    label="Врач"
                    onChange={(event) => {
                      console.log('onChange doctor id ', event.target.value);
                      onChange(event.target.value);
                    }}
                  >
                    {doctors?.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </SelectContainer>
            )}
          />

          <Controller
            rules={{required: true, pattern: /[\d]{2}:[\d]{2}/}}
            name={'dateStart'}
            control={control}
            defaultValue={'09:00'}
            render={({field: {onChange, onBlur, value}}) => (
              <FormControl variant={'outlined'} fullWidth>
                <InputLabel htmlFor="timeStart-select-label">
                  Время начала
                </InputLabel>
                <MuiInput
                  required
                  fullWidth
                  autoComplete={'off'}
                  label={'Время начала'}
                  id="timeStart-select-label"
                  onChange={onChange}
                  value={value}
                  error={!!errors.dateStart}
                  onBlur={onBlur}
                  autoCapitalize={'none'}
                  inputComponent={TimeMaskInput as any}
                />
              </FormControl>
            )}
          />

          <Controller
            rules={{required: true, pattern: /[\d]{2}:[\d]{2}/}}
            name={'dateFinish'}
            control={control}
            defaultValue={'17:00'}
            render={({field: {onChange, onBlur, value}}) => (
              <FormControl variant={'outlined'} fullWidth>
                <InputLabel htmlFor="timeFinish-select-label">
                  Время завершения
                </InputLabel>
                <MuiInput
                  required
                  fullWidth
                  autoComplete={'off'}
                  label={'Время начала'}
                  id="timeFinish-select-label"
                  onChange={onChange}
                  value={value}
                  error={!!errors.dateFinish}
                  onBlur={onBlur}
                  autoCapitalize={'none'}
                  inputComponent={TimeMaskInput as any}
                />
              </FormControl>
            )}
          />

          <SubmitButton
            fullWidth
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            variant={'text'}
          >
            Создать смену
          </SubmitButton>
          <FormHelperText hidden={!isError} error={true}>
            {'Ошибка'}
          </FormHelperText>
          <CloseButton onCloseRequest={closeModal} />
        </Box>
      </Modal>
    );
  }
);
