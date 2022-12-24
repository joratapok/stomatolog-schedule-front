import React, {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {eventSlice} from '../store/reducers/eventSlice';
import {EventCreator} from './modals/EventCreator';
import {DutyCreator} from './modals/DutyCreator';
import {EventDetails} from './modals/EventDetails';

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
