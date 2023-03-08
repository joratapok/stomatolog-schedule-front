import React, {useCallback, useEffect, useMemo} from 'react';
import {isAfter, parse} from 'date-fns';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {CircularProgress, IconButton, Tooltip} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppSelector} from '@box/shared/store/hooks';
import {useEventsData} from '@box/shared/hooks';
import {
  useCreateDutyShiftMutation,
  useDeleteDutyShiftMutation,
} from '@box/shared/store/services';
import {IDutyShift} from '@box/shared/models';
import {
  doctorNameById,
  stringDateCreator,
  timeFromDate,
} from '@box/shared/helpers';
import {DoctorInput, TimeInput} from '@box/shared/inputs';
import {
  ErrorMessage,
  ModalBase,
  SubmitButton,
  TypoContent,
} from '@box/shared/ui';
import {Box} from '@mui/system';
import {checkDutyOverlap} from '@box/shared/helpers/checkDutyOverlap';

type Props = {
  isVisible: boolean;
  onCloseRequest: () => void;
};

type FormState = {
  dateStart: string;
  dateFinish: string;
  doctor: number;
  root?: string;
};

export const DutyCreator: React.FC<Props> = React.memo(
  ({isVisible, onCloseRequest}) => {
    const {
      newDuty: {cabinetName, cabinetId},
    } = useAppSelector((state) => state.eventSlice);
    const {date: currentDate} = useAppSelector((state) => state.calendarSlice);
    const {doctors, cabinets} = useEventsData();
    const [createDuty, {isLoading, isError, error, isSuccess, reset}] =
      useCreateDutyShiftMutation();
    const [deleteDuty, {isLoading: isLoadingDelete, originalArgs}] =
      useDeleteDutyShiftMutation();
    const {
      setError,
      clearErrors,
      control,
      handleSubmit,
      reset: resetForm,
      formState: {errors},
    } = useForm<FormState>();
    const closeModal = () => {
      resetForm();
      onCloseRequest();
    };
    const duties = useMemo(() => {
      return cabinets?.find((el) => el.id === cabinetId)?.dutyShift ?? [];
    }, [cabinetId, cabinets]);

    const clearErrorsRequest = useCallback(() => {
      clearErrors('root');
    }, [clearErrors]);

    const onSubmit: SubmitHandler<FormState> = (data) => {
      const dutyInfo: IDutyShift = {
        cabinet: cabinetId,
        dateStart: '',
        dateFinish: '',
        doctor: data.doctor,
      };
      let isOverlap = false;
      let isOverHead = false;
      try {
        const dateFrom = parse(data.dateStart, 'HH:mm', new Date(currentDate));
        const dateFinish = parse(
          data.dateFinish,
          'HH:mm',
          new Date(currentDate)
        );
        dutyInfo.dateStart = stringDateCreator(dateFrom);
        dutyInfo.dateFinish = stringDateCreator(dateFinish);

        isOverHead = !isAfter(dateFinish, dateFrom);
        isOverlap = Boolean(checkDutyOverlap(duties, dateFrom, dateFinish));
      } catch {
        setError('root', {
          type: 'custom',
          message: 'Ошибка при формировании даты',
        });
      }

      if (isOverHead) {
        setError('root', {
          type: 'custom',
          message: 'Некорректно задано время',
        });
      } else if (isOverlap) {
        setError('root', {
          type: 'custom',
          message: 'Это время уже занято',
        });
      } else if (dutyInfo.dateStart && dutyInfo.dateFinish) {
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
      <ModalBase isVisible={isVisible} closeModal={closeModal}>
        <TypoContent sx={{mt: 4, mb: 2}}>Кабинет: {cabinetName}</TypoContent>
        <DoctorInput
          doctor={doctors && doctors[0]?.id}
          doctors={doctors}
          control={control}
          error={errors.doctor}
        />

        <TimeInput
          name={'dateStart'}
          label={'Время начала'}
          defaultValue={'09:00'}
          control={control}
          error={errors.dateStart}
          clearErrors={clearErrorsRequest}
        />
        <TimeInput
          name={'dateFinish'}
          label={'Время завершения'}
          defaultValue={'17:00'}
          control={control}
          error={errors.dateFinish}
          clearErrors={clearErrorsRequest}
        />

        <ErrorMessage
          isError={isError || Boolean(errors?.root?.message)}
          message={errors?.root?.message ?? 'Ошибка при создании смены'}
          inCenter
        />

        <SubmitButton
          fullWidth
          onClick={handleSubmit(onSubmit)}
          loading={isLoading}
          variant={'text'}
        >
          Создать новую смену
        </SubmitButton>

        {Boolean(duties.length) && (
          <>
            <TypoContent>Смены на сегодня</TypoContent>

            {duties.map((el) => {
              const isShowProgres = isLoadingDelete && originalArgs === el.id;
              return (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  key={el.id}
                >
                  <TypoContent>
                    {`${timeFromDate(el.dateStart)} - ${timeFromDate(
                      el.dateFinish
                    )} - ${doctorNameById(doctors, el.doctor)}`}
                  </TypoContent>

                  {isShowProgres && <CircularProgress />}

                  {!isShowProgres && (
                    <Tooltip
                      sx={{ml: 2}}
                      placement={'right'}
                      title="удалить смену"
                    >
                      <IconButton
                        onClick={() => {
                          clearErrors('root');
                          deleteDuty(el.id);
                        }}
                        color="error"
                        aria-label="delete duty"
                      >
                        <CloseRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              );
            })}
          </>
        )}
      </ModalBase>
    );
  }
);
