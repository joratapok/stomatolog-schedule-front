import {useMemo} from 'react';
import {format} from 'date-fns';
import {useGetEventsQuery} from '../services/events.api';
import {useAppSelector} from './redux';

type ClinicInfo = {
  title: string;
  phone: string;
  startOfTheDay: string;
  endOfTheDay: string;
};

export const useEventsData = () => {
  const {accessToken} = useAppSelector((state) => state.authSlice);
  const {date: currentDate} = useAppSelector((state) => state.calendarSlice);
  const {activeClinic} = useAppSelector((state) => state.eventSlice);
  const dateForFetch = useMemo(() => {
    return format(new Date(currentDate), 'dd-MM-yyyy');
  }, [currentDate]);
  const {data, refetch} = useGetEventsQuery(dateForFetch, {skip: !accessToken});
  const clinic = useMemo(() => {
    if (activeClinic) {
      return data?.find((c) => c.id === activeClinic);
    } else {
      return data && data[0];
    }
  }, [activeClinic, data]);
  const cabinets = useMemo(() => {
    return clinic?.cabinets ?? [];
  }, [data, clinic]);
  const doctors = useMemo(() => {
    return clinic?.doctors.filter((d) => d.clinic.includes(clinic.id)) ?? [];
  }, [data, clinic]);
  const clinicInfo: ClinicInfo | undefined = useMemo(() => {
    if (!clinic) return;
    return {
      title: clinic.title,
      phone: clinic.phone,
      startOfTheDay: clinic.startOfTheDay,
      endOfTheDay: clinic.endOfTheDay,
    };
  }, [data, clinic]);
  return {data, clinic, cabinets, doctors, clinicInfo, refetch};
};
