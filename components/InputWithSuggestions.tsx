import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {EventInput} from './UI/EventInput';
import {debounce} from '../helpers/debounce';
import {useGetCustomersQuery} from '../services/customers.api';
import {SuggestionItemContainer, SuggestionsPaper} from './UI/SuggestionsPaper';
import {Box, Typography} from '@mui/material';
import {IClient} from '../models/IClient';

type Props = {
  onChange: (e: ChangeEvent) => void;
  onBlur: () => void;
  value: string;
  errors: boolean;
  setClient: (client: IClient) => void;
};
interface ItemProps extends IClient {
  setClient: (client: IClient) => void;
}

const SuggestionItem: React.FC<ItemProps> = React.memo(
  ({
    lastName,
    firstName,
    middleName,
    phone,
    id,
    dateOfBirth,
    gender,
    setClient,
  }) => {
    const setItemClient = () => {
      setClient({
        lastName,
        firstName,
        middleName,
        phone,
        id,
        dateOfBirth,
        gender,
      });
    };
    return (
      <SuggestionItemContainer onClick={() => setItemClient()}>
        <Typography
          variant={'h6'}
        >{`${lastName} ${firstName} ${middleName}`}</Typography>
        <Typography variant={'h6'}>{`${phone}`}</Typography>
      </SuggestionItemContainer>
    );
  }
);

export const InputWithSuggestions: React.FC<Props> = React.memo(
  ({onChange, onBlur, value, errors, setClient}) => {
    const [lastNameQuery, setLastNameQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const {data} = useGetCustomersQuery(lastNameQuery, {skip: !lastNameQuery});
    const suggestedClients = useMemo(() => {
      return data ? data.slice(0, 5) : [];
    }, [data]);

    const newLastNameQuery = useCallback((text: string) => {
      setLastNameQuery(text);
    }, []);
    const debouncedLastNameQuery = useMemo(() => {
      return debounce({fn: newLastNameQuery, delay: 1000});
    }, [newLastNameQuery]);

    useEffect(() => {
      if (lastNameQuery.length > 1) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, [lastNameQuery]);
    return (
      <Box sx={{position: 'relative'}}>
        <EventInput
          required
          fullWidth
          autoComplete={'off'}
          label={'Фамилия'}
          onChange={(e) => {
            onChange(e);
            if (e.target.value.length >= 2) {
              debouncedLastNameQuery(e.target.value);
            } else if (!e.target.value.length) {
              setLastNameQuery('');
            }
          }}
          value={value}
          error={errors}
          onBlur={() => {
            setTimeout(() => setShowSuggestions(false), 250);
            onBlur();
          }}
          onFocus={() => {
            setShowSuggestions(true);
          }}
          autoCapitalize={'none'}
        />
        {showSuggestions && (
          <SuggestionsPaper>
            {suggestedClients?.map((client) => (
              <SuggestionItem
                key={client.id}
                {...client}
                setClient={setClient}
              />
            ))}
          </SuggestionsPaper>
        )}
      </Box>
    );
  }
);
