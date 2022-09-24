import React from 'react';
import { ContainerCenter } from './UI/ContainerCenter';
import {ThemeToggle} from './UI/buttons/ThemeButton';
import {ContainerInline} from './UI/ContainerInline';
import {Typography} from '@mui/material';

type Props = {
  toggleTheme: () => void;
}

export const Header: React.FC<Props> = React.memo(({toggleTheme}) => {
  return (
    <header>
      <ContainerCenter>
        <ContainerInline>
          <Typography variant={'h4'}>Header</Typography>
        </ContainerInline>
      </ContainerCenter>
      <ThemeToggle themeToggleRequest={toggleTheme} />
    </header>
  );
});
