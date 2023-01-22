import React, {FC, useCallback, useMemo} from 'react';
import {IServiceList} from '../models/IPriceList';
import {Table, TableBody, TableRow, Typography} from '@mui/material';
import {LowCell} from './UI/table/LowCell';
import {TrashButton} from './UI/buttons/TrashButton';
import {ToothCard} from '../models/events/ICreateEvent';
import {Box} from '@mui/system';

type Props = {
  services: IServiceList;
  deleteService: (toothNumber: number, id: number) => void;
};

export const ServicesTable: FC<Props> = React.memo(
  ({services, deleteService}) => {
    const sumServices: number = useMemo(() => {
      if (!services.length) {
        return 0;
      }
      return services.reduce((acc, el) => {
        const toothPrice = el.dentalServices.reduce(
          (a, e) => a + parseFloat(e.price),
          0
        );
        return acc + toothPrice;
      }, 0);
    }, [services]);
    if (!services.length) {
      return null;
    }
    return (
      <Box sx={{mb: 3}}>
        <Typography sx={{mb: 1}}>Список услуг</Typography>
        <Table sx={{minWidth: 300}} aria-label="simple table">
          <TableBody sx={{position: 'relative', border: 1}}>
            {services.map(({toothNumber, dentalServices}) => {
              return dentalServices?.map((el, index) => (
                <TableRow key={`${el.id} ${index}`} sx={{border: '0px'}}>
                  <LowCell align="left">
                    <Typography variant={'h6'}>
                      {ToothCard[toothNumber]}
                    </Typography>
                  </LowCell>
                  <LowCell align="left">
                    <Typography variant={'h6'}>{el.title}</Typography>
                  </LowCell>
                  <LowCell align="right">
                    <Typography noWrap variant={'h6'}>
                      {`${el.price} ₽`}
                    </Typography>
                  </LowCell>
                  <LowCell align="right">
                    <TrashButton
                      onClick={() => deleteService(toothNumber, el.id)}
                      size={'small'}
                    />
                  </LowCell>
                </TableRow>
              ));
            })}
            <TableRow sx={{border: '0px'}}>
              <LowCell colSpan={3} align="right">
                <Typography variant={'h6'} fontWeight="bold" align="right">
                  Общая сумма: {sumServices.toFixed(2)} ₽
                </Typography>
              </LowCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  }
);
