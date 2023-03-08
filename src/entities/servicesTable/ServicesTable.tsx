import React, {FC, useMemo} from 'react';
import {TableHead, TableBody, Typography, Box} from '@mui/material';
import {IServiceList} from '@box/shared/models';
import {
  TrashButton,
  LowCell,
  AddButton,
  DecreaseButton,
  TypoContent,
  HServiceRow,
  BServiceRow,
  TableService,
} from '@box/shared/ui';

type Props = {
  services: IServiceList;
  deleteService: (toothNumber: number, id: number) => void;
  changeCounter: (toothNumber: number, id: number, counter: number) => void;
};

export const ServicesTable: FC<Props> = React.memo(
  ({services, deleteService, changeCounter}) => {
    const sumServices: number = useMemo(() => {
      if (!services.length) {
        return 0;
      }
      return services.reduce((acc, el) => {
        const toothPrice = parseFloat(el.dentalServices[0].price) * el.count;
        return acc + toothPrice;
      }, 0);
    }, [services]);
    if (!services.length) {
      return null;
    }
    return (
      <Box sx={{mb: 3}}>
        <Typography sx={{mb: 1}}>Список услуг</Typography>
        <TableService aria-label="services table">
          <TableHead>
            <HServiceRow>
              <LowCell align={'left'}>
                <TypoContent>Зуб</TypoContent>
              </LowCell>
              <LowCell align={'center'}>
                <TypoContent>Услуга</TypoContent>
              </LowCell>
              <LowCell align={'center'}>
                <TypoContent>Кол-во</TypoContent>
              </LowCell>
              <LowCell align={'center'}>
                <TypoContent>Цена</TypoContent>
              </LowCell>
              <LowCell />
            </HServiceRow>
          </TableHead>
          <TableBody>
            {services.map(({toothNumber, dentalServices, count}) => {
              return dentalServices?.map((el, index) => (
                <BServiceRow key={`${el.id} ${index}`} sx={{border: '0px'}}>
                  <LowCell align="left">
                    <Typography variant={'h6'}>{toothNumber}</Typography>
                  </LowCell>
                  <LowCell align="left">
                    <Typography variant={'h6'}>{el.title}</Typography>
                  </LowCell>
                  <LowCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <DecreaseButton
                        size={'small'}
                        onClick={() => {
                          if (count > 1) {
                            changeCounter(toothNumber, el.id, -1);
                          } else {
                            deleteService(toothNumber, el.id);
                          }
                        }}
                      />
                      <Typography variant={'h6'}>{count}</Typography>
                      <AddButton
                        size={'small'}
                        onClick={() => changeCounter(toothNumber, el.id, 1)}
                      />
                    </Box>
                  </LowCell>
                  <LowCell align="center">
                    <Typography noWrap variant={'h6'}>
                      {`${parseFloat(el.price) * count} ₽`}
                    </Typography>
                  </LowCell>
                  <LowCell align="right">
                    <TrashButton
                      onClick={() => deleteService(toothNumber, el.id)}
                      size={'small'}
                    />
                  </LowCell>
                </BServiceRow>
              ));
            })}
            <BServiceRow>
              <LowCell colSpan={4} align="right">
                <Typography variant={'h6'} fontWeight="bold" align="right">
                  Общая сумма: {sumServices.toFixed(2)} ₽
                </Typography>
              </LowCell>
              <LowCell />
            </BServiceRow>
          </TableBody>
        </TableService>
      </Box>
    );
  }
);
