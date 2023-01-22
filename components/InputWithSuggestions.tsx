import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {EventInput} from './UI/EventInput';
import {debounce} from '../helpers/debounce';
import {SuggestionItemContainer, SuggestionsPaper} from './UI/SuggestionsPaper';
import {Box, Typography} from '@mui/material';

export interface ISuggestionItem {
  id: number;
  firstEntry: string;
  secondEntry?: string;
}

type Props = {
  onChange: (e: ChangeEvent) => void;
  onBlur: () => void;
  value: string;
  errors: boolean;
  query: string;
  label: string;
  newQuery: (query: string) => void;
  suggestions: Array<ISuggestionItem>;
  setSuggestion: (id: number) => void;
};
interface ItemProps extends ISuggestionItem {
  setSuggestion: (id: number) => void;
}

const SuggestionItem: React.FC<ItemProps> = React.memo(
  ({id, firstEntry, secondEntry, setSuggestion}) => {
    return (
      <SuggestionItemContainer onClick={() => setSuggestion(id)}>
        <Typography variant={'h6'}>{firstEntry}</Typography>
        <Typography variant={'h6'}>{secondEntry}</Typography>
      </SuggestionItemContainer>
    );
  }
);

export const InputWithSuggestions: React.FC<Props> = React.memo(
  ({
    onChange,
    onBlur,
    value,
    errors,
    query,
    label,
    newQuery,
    suggestions,
    setSuggestion,
  }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const debouncedLastNameQuery = useMemo(() => {
      return debounce({fn: newQuery, delay: 1000});
    }, [newQuery]);

    useEffect(() => {
      if (query.length > 1) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, [query]);
    return (
      <Box sx={{position: 'relative'}}>
        <EventInput
          required
          fullWidth
          autoComplete={'off'}
          label={label}
          onChange={(e) => {
            onChange(e);
            if (e.target.value.length >= 2) {
              debouncedLastNameQuery(e.target.value);
            } else if (!e.target.value.length) {
              newQuery('');
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
            {suggestions?.map((el) => (
              <SuggestionItem
                key={el.id}
                id={el.id}
                firstEntry={el.firstEntry}
                secondEntry={el.secondEntry}
                setSuggestion={setSuggestion}
              />
            ))}
          </SuggestionsPaper>
        )}
      </Box>
    );
  }
);
