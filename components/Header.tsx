import React from 'react';
import {ContainerCenter} from './UI/ContainerCenter';
import {ThemeToggle} from './UI/buttons/ThemeButton';
import {ContainerInline} from './UI/ContainerInline';
import {Typography} from '@mui/material';
import {MenuProfile} from './MenuProfile';

type Props = {
  toggleTheme: () => void;
};

export const Header: React.FC<Props> = React.memo(({toggleTheme}) => {
  return (
    <header>
      <ContainerCenter>
        <ContainerInline>
          <Typography sx={{textAlign: 'center'}} variant={'h4'}>
            Header
          </Typography>
        </ContainerInline>
        <ThemeToggle themeToggleRequest={toggleTheme} />
        <MenuProfile />
      </ContainerCenter>
    </header>
  );
});
