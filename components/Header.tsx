import React from 'react';
import { ContainerCenter } from './UI/ContainerCenter';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { authSlice } from '../store/reducers/authSlice';
import {ThemeToggle} from './UI/buttons/ThemeButton';
import {ContainerInline} from './UI/ContainerInline';
import {Typography} from '@mui/material';

type Props = {
  toggleTheme: () => void;
}

export const Header: React.FC<Props> = React.memo(({toggleTheme}) => {
  const { count } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const { increment } = authSlice.actions;
  const incrementCounter = () => {
    dispatch(increment(1));
  };
  return (
    <header>
      <ContainerCenter>
        <ContainerInline>
          <Typography variant={'h4'}>Header {count}</Typography>
          <button onClick={incrementCounter}>+</button>
        </ContainerInline>
      </ContainerCenter>
      <ThemeToggle themeToggleRequest={toggleTheme} />
    </header>
  );
});
