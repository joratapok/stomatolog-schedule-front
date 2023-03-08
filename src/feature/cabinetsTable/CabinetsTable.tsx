import React, {FC} from 'react';
import {Box, IconButton, TableBody, TableHead, Tooltip} from '@mui/material';
import {
  BServiceRow,
  HServiceRow,
  LowCell,
  TableService,
  TrashButton,
  TypoContent,
} from '@box/shared/ui';
import {ERoles, ICabinet} from '@box/shared/models';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';

type Props = {
  cabinets: ICabinet[];
};

export const CabinetsTable: FC<Props> = ({cabinets}) => {
  const dispatch = useAppDispatch();
  const {setModal, setCurrentCabinet} = settingSlice.actions;
  const {role} = useAppSelector((state) => state.userSlice);
  const addCabinet = () => {
    dispatch(setModal(ESettingsModals.CREATE_CABINET));
  };
  const deleteCabinet = (id: number) => {
    dispatch(setCurrentCabinet(id));
    dispatch(setModal(ESettingsModals.ALERT_DELETE_CABINET));
  };
  return (
    <>
      <Box display="flex" justifyContent="flex-end" sx={{mt: 1}}>
        {role !== ERoles.doctor && (
          <Tooltip placement={'left'} title="Создать кабинет">
            <IconButton
              onClick={addCabinet}
              color="primary"
              aria-label="add stuff"
            >
              <AddCircleOutlineIcon fontSize={'large'} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <TableService aria-label="cabinets table">
        <TableHead>
          <HServiceRow>
            <LowCell colSpan={2} align={'center'}>
              <TypoContent>Кабинеты</TypoContent>
            </LowCell>
          </HServiceRow>
        </TableHead>
        <TableBody>
          {cabinets.map((cabinet) => (
            <BServiceRow key={cabinet.id}>
              <LowCell align={'left'}>
                <TypoContent>{`${cabinet.name}`}</TypoContent>
              </LowCell>
              <LowCell align={'right'}>
                {role !== ERoles.doctor && (
                  <TrashButton
                    size={'medium'}
                    isRed
                    onClick={() => deleteCabinet(cabinet.id)}
                  />
                )}
              </LowCell>
            </BServiceRow>
          ))}
        </TableBody>
      </TableService>
    </>
  );
};
