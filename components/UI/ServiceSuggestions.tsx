import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import {useGetServicesQuery} from '../../services/priceList.api';
import {IPriceService} from '../../models/IPriceList';
import {Autocomplete, TextField, Typography} from '@mui/material';
import {debounce} from '../../helpers/debounce';
import {SuggestionItemContainer} from './SuggestionsPaper';

type Props = {
  setService: (toothNumber: number, service: IPriceService) => void;
  toothNumber: number;
};

export const ServiceSuggestions: React.FC<Props> = React.memo(
  ({setService, toothNumber}) => {
    const [serviceQuery, setServiceQuery] = useState('');
    const {data} = useGetServicesQuery(serviceQuery, {skip: !serviceQuery});
    const services: IPriceService[] = useMemo(() => {
      return data ? data.slice(0, 10) : [];
    }, [data]);
    const setSuggestService = useCallback(
      (service: IPriceService | null) => {
        if (service) {
          setService(toothNumber, service);
        }
      },
      [services, toothNumber]
    );

    const newQuery = useCallback((text: string) => {
      setServiceQuery(text);
    }, []);

    const debouncedQuery = useMemo(() => {
      return debounce({fn: newQuery, delay: 1000});
    }, [newQuery]);

    return (
      <Autocomplete
        sx={{mb: 2}}
        id="free-solo-2-demo"
        clearOnBlur={false}
        isOptionEqualToValue={(o, v) => o.id === v.id}
        options={services}
        getOptionLabel={(option) => option.title?.trim() ?? ''}
        noOptionsText={'нет услуг'}
        onInputChange={(e, newVal) => {
          if (newVal.length >= 2) {
            debouncedQuery(newVal);
          } else if (newVal.length) {
            newQuery('');
          }
        }}
        onChange={(e, newVal) => {
          setSuggestService(newVal);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Выбрать оказанные услуги" />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <SuggestionItemContainer>
                <Typography variant={'h6'}>{option.title}</Typography>
                <Typography
                  sx={{minWidth: '70px'}}
                  align={'center'}
                  noWrap
                  variant={'h6'}
                >
                  {option.price} ₽
                </Typography>
              </SuggestionItemContainer>
            </li>
          );
        }}
      />
    );
  }
);
