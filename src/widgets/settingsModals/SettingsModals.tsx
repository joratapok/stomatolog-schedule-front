import React, {useCallback} from 'react';

import {Ui} from '@box/feature/staffCreatorModal';
import {StaffDetailModal} from '@box/feature/staffDetailModal';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {ESettingsModals, settingSlice} from '@box/shared/store/reducers';

export const SettingsModals = React.memo(() => {
  const dispatch = useAppDispatch();
  const {closeModal} = settingSlice.actions;
  const {modalVision} = useAppSelector((state) => state.settingSlice);
  const onCloseRequest = useCallback(() => {
    dispatch(closeModal());
  }, []);
  return (
    <>
      <Ui
        isVisible={modalVision === ESettingsModals.NEW_STUFF}
        onCloseRequest={onCloseRequest}
      />
      <StaffDetailModal
        isVisible={modalVision === ESettingsModals.DETAIL_STUFF}
        onCloseRequest={onCloseRequest}
      />
    </>
  );
});
