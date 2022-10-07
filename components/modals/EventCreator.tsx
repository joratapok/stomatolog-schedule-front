import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {AuthInput} from '../UI/AuthInput';
import {SubmitButton} from '../UI/buttons/SubmitButton';
import {CloseButton} from '../UI/buttons/CloseButton';
import {useAppSelector} from '../../hooks/redux';
import {Typography} from '@mui/material';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};
type Inputs = {
  name: string;
};

export const EventCreator: React.FC<Props> = ({isVisible, onCloseRequest}) => {
  console.log('render modal');
  const {timeStart, cabinetId} = useAppSelector((state) => state.eventSlice);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>();
  const date = new Date(timeStart);
  const time = format(date, 'HH:mm');
  const dateText = format(date, 'do MMMM', {locale: ru});
  const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
    console.log('submit', data);
  }, []);
  return (
    <Modal
      open={isVisible}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') {
          return;
        }
        onCloseRequest();
      }}
    >
      <Box sx={style}>
        <Typography>{dateText}</Typography>
        <Typography>Время: {time}</Typography>
        <Controller
          rules={{required: true}}
          name={'name'}
          control={control}
          defaultValue={''}
          render={({field: {onChange, onBlur, value}}) => (
            <AuthInput
              required
              label={'Почта'}
              onChange={onChange}
              value={value}
              error={!!errors.name}
              onBlur={onBlur}
              autoCapitalize={'none'}
            />
          )}
        />

        <SubmitButton onClick={handleSubmit(onSubmit)} variant={'text'}>
          Создать запись
        </SubmitButton>
        <CloseButton onCloseRequest={onCloseRequest} />
      </Box>
    </Modal>
  );
};
