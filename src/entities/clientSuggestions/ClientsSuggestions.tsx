import React, {useCallback, useMemo, useState} from 'react';
import {Autocomplete, TextField, Typography} from '@mui/material';
import {IClient} from '@box/shared/models';
import {useGetCustomersQuery} from '@box/shared/store/services';
import {SuggestionItemContainer} from '@box/shared/ui';
import {fullNameCreator, debounce} from '@box/shared/helpers';

type Props = {
  onChange: (e: string) => void;
  value: string;
  errors?: boolean;
  setClient: (client: IClient) => void;
  required?: boolean;
};

export const ClientsSuggestions: React.FC<Props> = React.memo(
  ({onChange, value, setClient, errors = false, required = true}) => {
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
          if (newVal) {
            setClient(newVal);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            required={required}
            error={errors}
            label="Фaмилия"
          />
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
