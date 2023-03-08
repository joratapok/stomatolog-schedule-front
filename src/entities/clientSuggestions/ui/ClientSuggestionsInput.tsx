import React, {FC} from 'react';
import {Control, Controller} from 'react-hook-form';

import {IClient} from '@box/shared/models';
import {ClientsSuggestions} from '../ClientsSuggestions';

type Props = {
  control: Control<any>;
  error: boolean;
  setClient: (client: IClient) => void;
  clientId: number;
  nullifyClient: () => void;
};

export const ClientSuggestionsInput: FC<Props> = ({
  control,
  error,
  setClient,
  clientId,
  nullifyClient,
}) => {
  return (
    <Controller
      rules={{required: true, maxLength: 100}}
      name={'lastName'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, value}}) => (
        <ClientsSuggestions
          onChange={(e) => {
            if (clientId) {
              nullifyClient();
            }
            onChange(e);
          }}
          value={value}
          errors={error}
          setClient={setClient}
        />
      )}
    />
  );
};
