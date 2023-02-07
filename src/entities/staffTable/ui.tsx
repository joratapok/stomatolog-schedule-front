import React, {FC} from 'react';
import {Box, TableBody, TableHead} from '@mui/material';
import {
  BServiceRow,
  DeactivateButton,
  EditButton,
  HServiceRow,
  LowCell,
  TableService,
  TypoContent,
} from '@box/shared/ui';
import {IDoctor} from '@box/shared/models';
import {SxProps} from '@mui/system';
import {useAppDispatch} from '@box/shared/store/hooks';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';
import {usePatchProfileMutation} from '@box/shared/store/services';
import {ActivateButton} from '@box/shared/ui/buttons/ActivateButton';

interface Props {
  staff: IDoctor[];
  title: string;
  sx?: SxProps;
}

export const StaffTable: FC<Props> = React.memo(({staff, title, sx}) => {
  const dispatch = useAppDispatch();
  const {setModal, setCurrentStaff} = settingSlice.actions;
  const [patchProfile, {isLoading, isSuccess, isError, originalArgs}] =
    usePatchProfileMutation();
  const openDetailsModal = (person: IDoctor) => {
    dispatch(setCurrentStaff(person));
    dispatch(setModal(ESettingsModals.DETAIL_STUFF));
  };
  const deactivateProfile = (id: number, isActive: boolean) => {
    patchProfile({id, isActive});
  };
  return (
    <TableService sx={sx} title={title} aria-label="stuff table">
      <TableHead>
        <HServiceRow>
          <LowCell align={'center'}>
            <TypoContent>ФИО</TypoContent>
          </LowCell>
          <LowCell
            sx={{display: {xs: 'none', sm: 'table-cell'}}}
            align={'center'}
          >
            <TypoContent>Специальность</TypoContent>
          </LowCell>
          <LowCell
            sx={{display: {xs: 'none', md: 'table-cell'}}}
            align={'center'}
          >
            <TypoContent>Телефон</TypoContent>
          </LowCell>
          <LowCell />
        </HServiceRow>
      </TableHead>
      <TableBody>
        {staff.map((doctor) => (
          <BServiceRow
            pointer={'pointer'}
            key={doctor.id}
            onClick={() => openDetailsModal(doctor)}
          >
            <LowCell align={'left'}>
              <TypoContent isDisabled={!doctor.isActive}>
                {`${doctor.lastName} ${doctor.firstName} ${doctor.middleName} `}
                {!doctor.isActive && '(деактивирован)'}
              </TypoContent>
            </LowCell>
            <LowCell
              sx={{display: {xs: 'none', sm: 'table-cell'}}}
              align={'center'}
            >
              <TypoContent isDisabled={!doctor.isActive}>
                {doctor.role === 'doctor' ? doctor.speciality : 'Администратор'}
              </TypoContent>
            </LowCell>
            <LowCell
              sx={{display: {xs: 'none', md: 'table-cell'}}}
              align={'center'}
            >
              <TypoContent isDisabled={!doctor.isActive}>
                {doctor.phone}
              </TypoContent>
            </LowCell>
            <LowCell align={'center'}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {doctor.isActive && (
                  <EditButton size={'small'} onClick={() => {}} />
                )}

                {doctor.isActive ? (
                  <DeactivateButton
                    loading={originalArgs?.id === doctor.id && isLoading}
                    size={'small'}
                    onClick={() =>
                      deactivateProfile(doctor.id, !doctor.isActive)
                    }
                  />
                ) : (
                  <ActivateButton
                    loading={originalArgs?.id === doctor.id && isLoading}
                    size={'small'}
                    onClick={() =>
                      deactivateProfile(doctor.id, !doctor.isActive)
                    }
                  />
                )}
              </Box>
            </LowCell>
          </BServiceRow>
        ))}
      </TableBody>
    </TableService>
  );
});
