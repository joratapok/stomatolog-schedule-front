import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import {purple} from '@mui/material/colors';

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
    primary: purple,
    button: {
      main: purple[600],
      dark: purple[700],
      contrastText: '#ffffff',
    },
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#303030',
      paper: '#424242',
    },
    primary: {
      light: purple[200],
      main: purple[300],
      dark: purple[400],
    },
    button: {
      main: purple[400],
      dark: purple[600],
      contrastText: '#ffffff',
    },
  },
});
export const themeLight = responsiveFontSizes(light);
export const themeDark = responsiveFontSizes(dark);
