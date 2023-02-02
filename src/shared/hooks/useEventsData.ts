import {useMemo} from 'react';
import {format} from 'date-fns';
import {useGetEventsQuery} from '@box/shared/store/services';
import {useAppSelector} from '@box/shared/store/hooks';

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
  const administrators = useMemo(() => {
    return (
      clinic?.administrators.filter((d) => d.clinic.includes(clinic.id)) ?? []
    );
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
  return {data, clinic, cabinets, doctors, administrators, clinicInfo, refetch};
};
