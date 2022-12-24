import {useMemo} from 'react';
import {useGetEventsQuery} from '../services/events.api';
import {format} from 'date-fns';
import {useAppSelector} from './redux';

type ClinicInfo = {
  phone: string;
  startOfTheDay: string;
  endOfTheDay: string;
};

export const useEventsData = () => {
  const {accessToken} = useAppSelector((state) => state.authSlice);
  const {date: currentDate} = useAppSelector((state) => state.calendarSlice);
  const dateForFetch = useMemo(() => {
    return format(new Date(currentDate), 'dd-MM-yyyy');
  }, [currentDate]);
  const {data, refetch} = useGetEventsQuery(dateForFetch, {skip: !accessToken});
  const cabinets = useMemo(() => {
    return data && data[0]?.cabinets;
  }, [data]);
  const doctors = useMemo(() => {
    return (data && data[0]?.doctors) ?? [];
  }, [data]);
  const clinicInfo: ClinicInfo | undefined = useMemo(() => {
    const clinic = data && data[0];
    if (!clinic) return;
    return {
      phone: clinic.phone,
      startOfTheDay: clinic.startOfTheDay,
      endOfTheDay: clinic.endOfTheDay,
    };
  }, [data]);
  return {data, cabinets, doctors, clinicInfo, refetch};
};
