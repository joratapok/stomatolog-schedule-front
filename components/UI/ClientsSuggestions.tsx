import React, {useCallback, useMemo, useState} from 'react';
import {IClient} from '../../models/IClient';
import {useGetCustomersQuery} from '../../services/customers.api';
import {Autocomplete, TextField, Typography} from '@mui/material';
import {SuggestionItemContainer} from './SuggestionsPaper';
import {fullNameCreator} from '../../helpers/fullNameCreator';
import {debounce} from '../../helpers/debounce';

type Props = {
  onChange: (e: string) => void;
  value: string;
  errors: boolean;
  setClient: (client: IClient) => void;
};

export const ClientsSuggestions: React.FC<Props> = React.memo(
  ({onChange, value, setClient, errors}) => {
    const [lastNameQuery, setLastNameQuery] = useState('');
    const {data} = useGetCustomersQuery(lastNameQuery, {
      skip: !lastNameQuery,
    });
    const clients: IClient[] = useMemo(() => {
      return data ? data.slice(0, 8) : [];
    }, [data]);
    const newQuery = useCallback((text: string) => {
      setLastNameQuery(text);
    }, []);
    const debouncedLastNameQuery = useMemo(() => {
      return debounce({fn: newQuery, delay: 1000});
    }, [newQuery]);

    return (
      <Autocomplete
        blurOnSelect
        sx={{mb: 2}}
        clearOnBlur={false}
        isOptionEqualToValue={(o, v) => o.id === v.id}
        options={clients}
        getOptionLabel={(c) => c.lastName}
        noOptionsText={'нет совпадений'}
        inputValue={value}
        onInputChange={(e, newVal) => {
          if (newVal.length >= 2) {
            debouncedLastNameQuery(newVal);
          } else if (newVal.length) {
            newQuery('');
          }
          onChange(newVal);
        }}
        onChange={(e, newVal) => {
          console.log('in client change ', newVal);
          if (newVal) {
            setClient(newVal);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} required error={errors} label="Фaмилия" />
        )}
        renderOption={(props, c) => {
          return (
            <li {...props} key={c.id}>
              <SuggestionItemContainer>
                <Typography variant={'h6'}>
                  {fullNameCreator(c.lastName, c.firstName, c.middleName)}
                </Typography>
                <Typography variant={'h6'}>{c.phone}</Typography>
              </SuggestionItemContainer>
            </li>
          );
        }}
      />
    );
  }
);
