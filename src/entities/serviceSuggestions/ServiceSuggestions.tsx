import React, {useCallback, useMemo, useState} from 'react';
import {Autocomplete, TextField, Typography} from '@mui/material';
import {useGetServicesQuery} from '@box/shared/store/services';
import {IPriceService} from '@box/shared/models';
import {SuggestionItemContainer} from '@box/shared/ui';
import {useDebounce} from '@box/shared/hooks';

type Props = {
  setService: (toothNumber: number, service: IPriceService) => void;
  toothNumber: number;
};

export const ServiceSuggestions: React.FC<Props> = React.memo(
  ({setService, toothNumber}) => {
    const [serviceQuery, setServiceQuery] = useState('');
    const query = useDebounce(serviceQuery);
    const {data} = useGetServicesQuery(query, {
      skip: query?.length <= 2,
    });
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
    const setNewQuery = useCallback((query: string) => {
      setServiceQuery(query);
    }, []);

    return (
      <Autocomplete
        clearOnEscape
        sx={{mb: 2}}
        id="free-solo-2-demo"
        clearOnBlur={true}
        filterOptions={(options) => (query.length <= 2 ? [] : options)}
        isOptionEqualToValue={(o, v) => o.id === v.id}
        options={services}
        getOptionLabel={(option) => option.title.trim() ?? ''}
        noOptionsText={'нет услуг'}
        inputValue={serviceQuery}
        onInputChange={(e, newVal) => {
          if (e?.type === 'change') {
            setNewQuery(newVal);
          }
        }}
        onChange={(e, newVal) => {
          setSuggestService(newVal);
          setNewQuery('');
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
