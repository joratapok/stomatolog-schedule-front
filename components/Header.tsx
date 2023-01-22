import React from 'react';
import {ContainerCenter} from './UI/ContainerCenter';
import {ThemeToggle} from './UI/buttons/ThemeButton';
import {ContainerInline} from './UI/ContainerInline';
import {Typography} from '@mui/material';
import {MenuProfile} from './MenuProfile';
import {useRouter} from 'next/router';

type Props = {
  toggleTheme: () => void;
};

export const Header: React.FC<Props> = React.memo(({toggleTheme}) => {
  const router = useRouter();
  const routeHome = () => {
    router.push('/').catch((e) => console.log('route home error ', e));
  };
  return (
    <header>
      <ContainerCenter>
        <ContainerInline>
          <Typography
            onClick={routeHome}
            sx={{display: 'inline', textAlign: 'center', cursor: 'pointer'}}
            variant={'h4'}
          >
            Header
          </Typography>
        </ContainerInline>
        <ThemeToggle themeToggleRequest={toggleTheme} />
        <MenuProfile />
      </ContainerCenter>
    </header>
  );
});
