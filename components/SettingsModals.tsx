import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {ESettingsModals, settingSlice} from '../store/reducers/settingSlice';
import {StuffCreatorModal} from './modals/StuffCreatorModal';

export const SettingsModals = React.memo(() => {
  const dispatch = useAppDispatch();
  const {closeModal} = settingSlice.actions;
  const {modalVision} = useAppSelector((state) => state.settingSlice);
  const onCloseRequest = useCallback(() => {
    dispatch(closeModal());
  }, []);
  return (
    <>
      <StuffCreatorModal
        isVisible={modalVision === ESettingsModals.NEW_STUFF}
        onCloseRequest={onCloseRequest}
      />
    </>
  );
});
