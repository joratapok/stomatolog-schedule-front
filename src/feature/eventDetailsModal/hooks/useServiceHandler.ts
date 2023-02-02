import {useCallback, useState} from 'react';
import {
  IPriceService,
  IServiceList,
  IService,
} from '@box/shared/models/IPriceList';

export const useServiceHandler = () => {
  const [toothNumber, setTooth] = useState<number>(11);
  const [localServices, setServices] = useState<IServiceList>([]);
  const setToothNumber = useCallback((toothNumber: number) => {
    setTooth(toothNumber);
  }, []);
  const setService = useCallback(
    (toothNumber: number, service: IPriceService) => {
      if (!service) {
        return;
      }
      const newItem: IService = {
        toothNumber,
        dentalServices: [service],
        count: 1,
      };
      setServices((prev) => [...prev, newItem]);
      // setServices((prev) => {
      //   const item = prev.find((el) => el.toothNumber === toothNumber);
      //   if (item) {
      //     const existServices = item.dentalServices.map((s) => s.id);
      //     if (existServices.includes(service.id)) {
      //       return [
      //         ...prev.map((el) => {
      //           if (el.toothNumber !== toothNumber) {
      //             return el;
      //           }
      //           return {
      //             ...el,
      //             dentalServices: el.dentalServices.map((s) => {
      //               if (s.id !== service.id) {
      //                 return s;
      //               }
      //               return {...s, count: s.count + 1};
      //             }),
      //           };
      //         }),
      //       ];
      //     }
      //     return [
      //       ...prev.filter((el) => el.toothNumber !== item.toothNumber),
      //       {...item, dentalServices: [...item.dentalServices, service]},
      //     ];
      //   }
      //   return [...prev, {toothNumber, dentalServices: [service]}];
      // });
    },
    []
  );
  const deleteService = useCallback((toothNumber: number, id: number) => {
    setServices((prev) => {
      return prev.filter((s) => {
        if (s.toothNumber !== toothNumber) {
          return true;
        }
        return s.dentalServices[0].id !== id;
      });
    });

    // setServices((prev) => {
    //   const item = prev.find((el) => el.toothNumber === toothNumber);
    //   if ((item?.dentalServices.length ?? 0) > 1) {
    //     return [
    //       ...prev.map((el) => {
    //         if (el.toothNumber !== toothNumber) {
    //           return el;
    //         }
    //         return {
    //           ...el,
    //           dentalServices: el.dentalServices.filter((s) => s.id !== id),
    //         };
    //       }),
    //     ];
    //   }
    //   return [...prev.filter((el) => el.toothNumber !== toothNumber)];
    // });
  }, []);
  const changeCounterService = useCallback(
    (toothNumber: number, id: number, counter: number) => {
      setServices((prev) => {
        return prev.map((s) => {
          if (s.toothNumber !== toothNumber) {
            return s;
          }
          if (s.dentalServices[0].id !== id) {
            return s;
          }
          return {...s, count: s.count + counter};
        });
      });

      // setServices((prev) => {
      //   return [
      //     ...prev.map((el) => {
      //       if (el.toothNumber !== toothNumber) {
      //         return el;
      //       }
      //       return {
      //         ...el,
      //         dentalServices: el.dentalServices.map((s) => {
      //           if (s.id !== id) {
      //             return s;
      //           }
      //           return {...s, count: s.count + counter};
      //         }),
      //       };
      //     }),
      //   ];
      // });
    },
    []
  );
  return {
    toothNumber,
    localServices,
    setServices,
    setService,
    changeCounterService,
    deleteService,
    setToothNumber,
  };
};
