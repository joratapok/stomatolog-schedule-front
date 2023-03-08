import React, {useCallback} from 'react';

import {EventCreator} from '@box/feature/eventCreatorModal/EventCreator';
import {DutyCreator} from '@box/feature/dutyCreatorModal/DutyCreator';
import {EventDetails} from '@box/feature/eventDetailsModal/EventDetails';
import {useAppDispatch, useAppSelector} from '@box/shared/store/hooks';
import {eventSlice} from '@box/shared/store/reducers';

export const ModalsKeeper = React.memo(() => {
  const dispatch = useAppDispatch();
  const {closeModal, closeCreatorDuty, closeEventDetails} = eventSlice.actions;
  const {isVisibleModal, isVisibleCreatorDuty, isVisibleEventDetails} =
    useAppSelector((state) => state.eventSlice);
  const onCloseRequest = useCallback(() => {
    dispatch(closeModal());
  }, []);
  const closeDutyCreator = useCallback(() => {
    dispatch(closeCreatorDuty());
  }, []);
  const closeDetails = useCallback(() => {
    dispatch(closeEventDetails());
  }, []);
  return (
    <>
      <EventCreator
        isVisible={isVisibleModal}
        onCloseRequest={onCloseRequest}
      />
      <DutyCreator
        isVisible={isVisibleCreatorDuty}
        onCloseRequest={closeDutyCreator}
      />
      <EventDetails
        isVisible={isVisibleEventDetails}
        onCloseRequest={closeDetails}
      />
    </>
  );
});
