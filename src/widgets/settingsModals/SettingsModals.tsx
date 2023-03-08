import React, {useCallback} from 'react';

import {StaffCreatorModal} from '@box/feature/staffCreatorModal';
import {StaffRedactorModal} from '@box/feature/staffRedactorModal';
import {StaffDetailModal} from '@box/feature/staffDetailModal';
import {ClinicRedactorModal} from '@box/feature/clinicRedactorModal';
import {ClientCreatorModal} from '@box/feature/clientCreatorModal';
import {CabinetCreatorModal} from '@box/feature/cabinetCreatorModal';
import {AlertDialog} from '@box/feature/alertDialog';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';
import {ClientRedactorModal} from '@box/feature/clientRedactorModal';

export const SettingsModals = React.memo(() => {
  const dispatch = useAppDispatch();
  const {closeModal} = settingSlice.actions;
  const {modalVision} = useAppSelector((state) => state.settingSlice);
  const onCloseRequest = useCallback(() => {
    dispatch(closeModal());
  }, []);
  return (
    <>
      <StaffCreatorModal
        isVisible={modalVision === ESettingsModals.NEW_STUFF}
        onCloseRequest={onCloseRequest}
      />
      <StaffDetailModal
        isVisible={modalVision === ESettingsModals.DETAIL_STUFF}
        onCloseRequest={onCloseRequest}
      />
      <StaffRedactorModal
        isVisible={modalVision === ESettingsModals.REDACTOR_STUFF}
        onCloseRequest={onCloseRequest}
      />
      <ClientRedactorModal
        isVisible={modalVision === ESettingsModals.REDACTOR_CLIENT}
        onCloseRequest={onCloseRequest}
      />
      <ClientCreatorModal
        isVisible={modalVision === ESettingsModals.CREATE_CLIENT}
        onCloseRequest={onCloseRequest}
      />
      <CabinetCreatorModal
        isVisible={modalVision === ESettingsModals.CREATE_CABINET}
        onCloseRequest={onCloseRequest}
      />
      <AlertDialog
        isVisible={modalVision === ESettingsModals.ALERT_DELETE_CABINET}
        onCloseRequest={onCloseRequest}
      />
      <ClinicRedactorModal
        isVisible={modalVision === ESettingsModals.REDACTOR_CLINIC}
        onCloseRequest={onCloseRequest}
      />
    </>
  );
});
