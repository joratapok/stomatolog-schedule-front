import React from 'react';
import {useRouter} from 'next/router';
import {Typography} from '@mui/material';
import {MenuProfile} from '@box/feature/menuProfile/MenuProfile';
import {ThemeToggle} from '@box/entities/themeButton/ThemeButton';
import {ContainerCenter, ContainerInline} from '@box/shared/ui';

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
