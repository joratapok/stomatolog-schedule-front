import {TypoContent} from '@box/shared/ui';
import {ClientsSuggestions} from '@box/entities/clientSuggestions';
import React, {useCallback, useState} from 'react';
import {IClient} from '@box/shared/models';
import {fullNameCreator} from '@box/shared/helpers';
import {useGetCustomerDetailQuery} from '@box/shared/store/services';
import {Box} from '@mui/system';
import {CircularProgress} from '@mui/material';

export const ClientInfo = () => {
  const [clientName, setClientName] = useState('');
  const [currentClient, setCurrentClient] = useState<IClient | null>(null);
  const {data, isLoading} = useGetCustomerDetailQuery(
    `${currentClient?.id}` ?? '',
    {
      skip: !currentClient?.id,
    }
  );

  const setClient = useCallback((client: IClient) => {
    setCurrentClient(client);
  }, []);
  return (
    <Box sx={{p: 2}}>
      <TypoContent sx={{mt: 2, mb: 2}}>Найти клиента</TypoContent>
      <ClientsSuggestions
        onChange={setClientName}
        value={clientName}
        setClient={setClient}
        required={false}
      />
      {!!currentClient && (
        <>
          <TypoContent>
            {fullNameCreator(
              currentClient.lastName,
              currentClient.firstName,
              currentClient.middleName
            )}
          </TypoContent>
          <TypoContent>{currentClient.phone}</TypoContent>
          <TypoContent>{currentClient.dateOfBirth}</TypoContent>
          <TypoContent>{currentClient.gender}</TypoContent>

          <TypoContent>Зубная карта</TypoContent>

          {isLoading && (
            <Box sx={{display: 'flex'}}>
              <CircularProgress />
            </Box>
          )}
          {!!data && JSON.stringify(data)}
        </>
      )}
    </Box>
  );
};
