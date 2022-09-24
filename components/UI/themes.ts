import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import {purple, grey, cyan} from '@mui/material/colors';

export const lightTheme = {
  body: '#ECECEC',
  text: '#214966',
  toggleBorder: '#FFF',
  colors: {
    background: '#ECECEC',
    backForm: '#FFF',
  },
  button: {
    background: '#ECECEC',
    text: '#FFF',
  },
};
export const darkTheme = {
  body: '#363537',
  text: '#FFFFFF',
  toggleBorder: '#6B8096',
  background: '#999',
  colors: {
    background: '#999',
    backForm: '#262627',
  },
  button: {
    background: '#FFF',
    text: '#282828',
  },
};

export const light = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ececec',
      paper: '#fff',
    },
    primary: {
      light: purple[300],
      main: purple[400],
      dark: purple[600],
    },
    secondary: {
      light: cyan[300],
      main: cyan[600],
      dark: cyan[800],
    },
    button: {
      main: purple[600],
      dark: purple[700],
      contrastText: '#ffffff',
    },
    borders: {
      main: grey[300],
      dark: grey[400],
    },
  },
});

/*
#121212
#212121
#303030
#424242
 */

const dark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#212121',
      paper: '#282828',
    },
    text: {
      primary: 'rgba(255,255,255,0.7)',
      secondary: 'rgba(255,255,255,0.5)',
    },
    primary: {
      light: '#DBB2FF',
      main: '#BB86FC',
      dark: '#985EFF',
    },
    secondary: {
      light: cyan[500],
      main: cyan[300],
      dark: cyan[200],
    },
    button: {
      main: purple[400],
      dark: purple[600],
      contrastText: '#000',
    },
    borders: {
      main: grey[600],
      dark: grey[700],
    },
  },
});
export const themeLight = responsiveFontSizes(light);
export const themeDark = responsiveFontSizes(dark);
