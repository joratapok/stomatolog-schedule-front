import {useCallback, useState} from 'react';
import {IPriceService, IServiceList} from '../models/IPriceList';

export const useServiceHandler = () => {
  const [toothNumber, setTooth] = useState<number>(0);
  const [localServices, setServices] = useState<IServiceList>([]);
  const setToothNumber = useCallback((toothNumber: number) => {
    setTooth(toothNumber);
  }, []);
  const addService = useCallback(
    (toothNumber: number, service: IPriceService) => {
      if (!service) {
        return;
      }
      setServices((prev) => {
        const item = prev.find((el) => el.toothNumber === toothNumber);
        if (item) {
          return [
            ...prev.filter((el) => el.toothNumber !== item.toothNumber),
            {...item, dentalServices: [...item.dentalServices, service]},
          ];
        }
        return [...prev, {toothNumber, dentalServices: [service]}];
      });
    },
    []
  );
  const deleteService = useCallback((toothNumber: number, id: number) => {
    setServices((prev) => {
      const item = prev.find((el) => el.toothNumber === toothNumber);
      if ((item?.dentalServices.length ?? 0) > 1) {
        return [
          ...prev.map((el) => {
            if (el.toothNumber !== toothNumber) {
              return el;
            }
            return {
              ...el,
              dentalServices: el.dentalServices.filter((s) => s.id !== id),
            };
          }),
        ];
      }
      return [...prev.filter((el) => el.toothNumber !== toothNumber)];
    });
  }, []);
  return {
    toothNumber,
    localServices,
    setServices,
    addService,
    deleteService,
    setToothNumber,
  };
};
