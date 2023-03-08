import React from 'react';
import {Typography} from '@mui/material';
import {ContainerInline} from '@box/shared/ui';

export const Footer = () => {
  return (
    <header>
      <ContainerInline>
        <Typography sx={{textAlign: 'center'}} variant={'h4'}>
          Footer
        </Typography>
      </ContainerInline>
    </header>
  );
};
