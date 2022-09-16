import React, {useEffect, useMemo, useState} from 'react';
import type {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/query';
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import Layout from '../components/Layout';
import {EThemeType} from '../types/theme';
import {themeDark, themeLight} from '../components/UI/themes';
import {setupStore} from '../store/store';

const store = setupStore();
setupListeners(store.dispatch);

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<EThemeType>(EThemeType.DARK);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        let newMode = EThemeType.DARK;
        setMode((prevMode) => {
          newMode = prevMode === EThemeType.LIGHT
            ? EThemeType.DARK : EThemeType.LIGHT;
          return newMode;
        });
        localStorage.setItem('themeType', newMode);
      },
    }),
    [],
  );

  useEffect(() => {
    const savedThemeType = localStorage.getItem('themeType');
    if (savedThemeType) {
      setMode(savedThemeType as EThemeType);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={mode === 'light' ? themeLight : themeDark}>
        <Provider store={store}>
          <CssBaseline />
          <Layout toggleTheme={colorMode.toggleColorMode}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
