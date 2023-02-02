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

interface Props {
  staff: IDoctor[];
  title: string;
  sx?: SxProps;
}

export const StaffTable: FC<Props> = React.memo(({staff, title, sx}) => {
  const dispatch = useAppDispatch();
  const {setModal, setCurrentStaff} = settingSlice.actions;
  const openDetailsModal = (person: IDoctor) => {
    console.log('set detail modal');
    dispatch(setCurrentStaff(person));
    dispatch(setModal(ESettingsModals.DETAIL_STUFF));
  };
  return (
    <TableService sx={sx} title={title} aria-label="stuff table">
      <TableHead>
        <HServiceRow>
          <LowCell align={'center'}>
            <TypoContent>ФИО</TypoContent>
          </LowCell>
          <LowCell align={'center'}>
            <TypoContent>Специальность</TypoContent>
          </LowCell>
          <LowCell align={'center'}>
            <TypoContent>Телефон</TypoContent>
          </LowCell>
          <LowCell />
        </HServiceRow>
      </TableHead>
      <TableBody>
        {staff.map((doctor) => (
          <BServiceRow key={doctor.id} onClick={() => openDetailsModal(doctor)}>
            <LowCell align={'left'}>
              <TypoContent>{`${doctor.lastName} ${doctor.firstName} ${doctor.middleName}`}</TypoContent>
            </LowCell>
            <LowCell align={'center'}>
              <TypoContent>{doctor.speciality}</TypoContent>
            </LowCell>
            <LowCell align={'center'}>
              <TypoContent>{doctor.phone}</TypoContent>
            </LowCell>
            <LowCell align={'center'}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <EditButton size={'small'} onClick={() => {}} />
                <DeactivateButton size={'small'} onClick={() => {}} />
              </Box>
            </LowCell>
          </BServiceRow>
        ))}
      </TableBody>
    </TableService>
  );
});
