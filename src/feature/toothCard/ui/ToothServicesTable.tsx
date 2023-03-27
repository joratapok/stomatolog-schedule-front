import React, {FC, useCallback, useMemo} from 'react';
import {format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import {useRouter} from 'next/router';
import {Link, TableBody, TableHead, TableRow} from '@mui/material';
import {addPortInURL, sameDateFinder} from '@box/feature/toothCard';
import {ITeeth} from '@box/shared/models';
import {
  HServiceRow,
  LowCell,
  TableService,
  TypoContent,
  ToothCardCell,
  TypoLink,
} from '@box/shared/ui';
import {EUrls} from '@box/shared/types';
import {dateParser} from '@box/shared/helpers';
import {useAppDispatch} from '@box/shared/store/hooks';
import {calendarSlice} from '@box/shared/store/reducers';

type Props = {
  toothInfo: ITeeth[];
};

export const ToothServicesTable: FC<Props> = ({toothInfo}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {setDate} = calendarSlice.actions;
  const tableInfo = useMemo(() => {
    let defaultRowspan = 1;
    return toothInfo.map((el, index, array) => {
      let currentRowSpan = 0;

      if (defaultRowspan > 1) {
        defaultRowspan--;
      }

      if (index < array.length - 1 && defaultRowspan === 1) {
        if (el.event.dateStart === array[index + 1].event.dateStart) {
          currentRowSpan = sameDateFinder(array, index);
          defaultRowspan = currentRowSpan + 1;
        }
      }

      const rowspan = Boolean(currentRowSpan)
        ? currentRowSpan
        : defaultRowspan === 1
        ? defaultRowspan
        : 0;

      return {
        code: el.dentalServices[0].code,
        service: el.dentalServices[0].title,
        date: el.event.dateStart,
        invoice: el.event.invoice,
        rowspan,
      };
    });
  }, [toothInfo]);

  const dateTouchHandler = useCallback(
    (dateEvent: string) => {
      const date = dateParser(dateEvent);
      const dateText = format(date, 'do MMMM', {locale: ru});
      dispatch(setDate({date: date.getTime(), dateText}));
      router
        .push(EUrls.HOME_PAGE)
        .catch((e) => console.log('redirect to home error', e));
    },
    [router]
  );

  if (!toothInfo.length) {
    return null;
  }
  return (
    <>
      <TableService sx={{mt: 4}} aria-label="services table">
        <TableHead>
          <HServiceRow>
            <LowCell align={'left'}>
              <TypoContent>Код</TypoContent>
            </LowCell>
            <LowCell align={'center'}>
              <TypoContent>Услуга</TypoContent>
            </LowCell>
            <LowCell align={'center'}>
              <TypoContent>Дата</TypoContent>
            </LowCell>
            <LowCell align={'center'}>
              <TypoContent>Счет</TypoContent>
            </LowCell>
          </HServiceRow>
        </TableHead>
        <TableBody>
          {tableInfo.map((el, index) => (
            <TableRow key={`${index}`}>
              <ToothCardCell align="left">
                <TypoContent variant={'h6'}>{el.code}</TypoContent>
              </ToothCardCell>
              <ToothCardCell align="center">
                <TypoContent variant={'h6'}>{el.service}</TypoContent>
              </ToothCardCell>
              {Boolean(el.rowspan) && (
                <ToothCardCell align="center" rowSpan={el.rowspan}>
                  <TypoLink onClick={() => dateTouchHandler(el.date)}>
                    {el.date}
                  </TypoLink>
                </ToothCardCell>
              )}
              {Boolean(el.rowspan) && (
                <ToothCardCell align="center" rowSpan={el.rowspan}>
                  {el.invoice && (
                    <Link
                      onClick={() =>
                        console.log(`link ${addPortInURL(el.invoice)}`)
                      }
                      rel="noreferrer"
                      href={addPortInURL(el.invoice)}
                      target="_blank"
                    >
                      <TypoLink variant={'h6'}>pdf</TypoLink>
                    </Link>
                  )}
                  {!el.invoice && <TypoContent variant={'h6'}>-</TypoContent>}
                </ToothCardCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TableService>
    </>
  );
};
