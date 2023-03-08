import React, {useCallback, useState} from 'react';
import {Box} from '@mui/system';
import {
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {TeethCard} from '@box/feature/toothCard';
import {TeethPlan} from '@box/feature/teethPlan';
import {ClientsSuggestions} from '@box/entities/clientSuggestions';
import {useGetCustomerDetailQuery} from '@box/shared/store/services';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';
import {IClient} from '@box/shared/models';
import {OpenArrowButton, TypoContent} from '@box/shared/ui';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const ClientInfo = () => {
  const dispatch = useAppDispatch();
  const {setModal, setCurrentClientInfo} = settingSlice.actions;
  const {currentClient: clientId} = useAppSelector(
    (state) => state.settingSlice
  );
  const [isCollapsedTeethCard, setIsCollapsedTeethCard] = useState(true);
  const [isCollapsedPlan, setIsCollapsedPlan] = useState(true);
  const [clientName, setClientName] = useState('');
  const [client, setClient] = useState<IClient | null>(null);
  const currentId = client?.id ? client.id : clientId;
  const {data, isLoading} = useGetCustomerDetailQuery(`${currentId}`, {
    skip: !clientId && !client?.id,
  });
  const currentClient = data || client;
  const addClient = () => {
    dispatch(setModal(ESettingsModals.CREATE_CLIENT));
  };
  const redactorClient = useCallback((client: IClient) => {
    dispatch(setCurrentClientInfo(client));
    dispatch(setModal(ESettingsModals.REDACTOR_CLIENT));
  }, []);

  const setClientHandler = useCallback((client: IClient) => {
    setClient(client);
  }, []);
  const teethCardVisibleHandler = useCallback(() => {
    setIsCollapsedTeethCard((prev) => !prev);
  }, []);
  const planVisibleHandler = useCallback(() => {
    setIsCollapsedPlan((prev) => !prev);
  }, []);
  return (
    <Box sx={{p: 2}}>
      <Box display="flex" justifyContent="space-between" sx={{mb: 1}}>
        <Typography variant={'h5'} sx={{mt: 1, ml: 1}}>
          Найти клиента
        </Typography>
        <Tooltip placement={'left'} title="Создать клиента">
          <IconButton
            onClick={addClient}
            color="primary"
            aria-label="add stuff"
          >
            <AddCircleOutlineIcon fontSize={'large'} />
          </IconButton>
        </Tooltip>
      </Box>

      <ClientsSuggestions
        onChange={setClientName}
        value={clientName}
        setClient={setClientHandler}
        required={false}
      />
      {isLoading && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      {!!currentClient && (
        <>
          <TypoContent>
            {`ФИО: ${currentClient.lastName} ${currentClient.firstName} ${currentClient.middleName}`}
          </TypoContent>
          <TypoContent>{`Телефон: ${currentClient.phone}`}</TypoContent>
          <TypoContent>{`Дата рождения: ${currentClient.dateOfBirth}`}</TypoContent>
          {!!currentClient.discount && (
            <TypoContent>{`Скидка: ${currentClient.discount}%`}</TypoContent>
          )}
          <Button
            sx={{mt: 2}}
            onClick={() => {
              redactorClient(currentClient);
            }}
            variant="outlined"
            endIcon={<EditRoundedIcon />}
          >
            Редактировать
          </Button>

          <Box sx={{my: 2}}>
            <OpenArrowButton
              onClick={teethCardVisibleHandler}
              isUpArrow={!isCollapsedTeethCard}
              title={'Зубная карта'}
            />
          </Box>

          <Collapse in={!isCollapsedTeethCard}>
            <TeethCard dentalChart={data?.dentalChart} />
          </Collapse>

          <Box sx={{my: 2}}>
            <OpenArrowButton
              onClick={planVisibleHandler}
              isUpArrow={!isCollapsedPlan}
              title={'План лечения'}
            />
          </Box>

          <Collapse in={!isCollapsedPlan}>
            <TeethPlan
              clientId={currentClient.id ?? 0}
              treatmentPlan={currentClient.treatmentPlan ?? []}
            />
          </Collapse>
        </>
      )}
    </Box>
  );
};
