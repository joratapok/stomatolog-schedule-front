import React, {useEffect, useMemo, useState} from 'react';
import {setupListeners} from '@reduxjs/toolkit/query';
import {Provider} from 'react-redux';
import type {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';

import Layout from '@box/app/layout/Layout';
import {themeDark, themeLight} from '@box/app/config/themes';
import {AuthTokenSetter} from '@box/feature/authSetter';
import {setupStore} from '@box/shared/store/store';
import {EThemeType} from '@box/shared/types/theme';

const store = setupStore();
setupListeners(store.dispatch);

function MyApp({Component, pageProps}: AppProps) {
  const [mode, setMode] = useState<EThemeType>(EThemeType.DARK);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        let newMode = EThemeType.DARK;
        setMode((prevMode) => {
          newMode =
            prevMode === EThemeType.LIGHT ? EThemeType.DARK : EThemeType.LIGHT;
          return newMode;
        });
        localStorage.setItem('themeType', newMode);
      },
    }),
    []
  );

  /*
   * Theme setter
   */
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
          <AuthTokenSetter>
            <CssBaseline />
            <Layout toggleTheme={colorMode.toggleColorMode}>
              <Component {...pageProps} />
            </Layout>
          </AuthTokenSetter>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
