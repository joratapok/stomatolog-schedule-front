import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import {purple, grey, cyan, blueGrey} from '@mui/material/colors';

const typoHeaders = {
  h6: {
    fontSize: '0.9rem',
    fontWeight: 400,
    '@media (min-width:1000px)': {
      fontSize: '1rem',
    },
  },
  h5: {
    fontSize: '1.1rem',
    '@media (min-width:1000px)': {
      fontSize: '1.2rem',
    },
  },
  h4: {
    fontSize: '1.3rem',
    '@media (min-width:1000px)': {
      fontSize: '1.5rem',
    },
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
    suggestions: {
      main: blueGrey[100],
      dark: blueGrey[200],
    },
  },
  typography: {
    ...typoHeaders,
    reverse: {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: 'rgba(255,255,255,0.9)',
    },
  },
});

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
      disabled: 'rgba(255,255,255,0.2)',
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
    suggestions: {
      main: blueGrey[800],
      dark: blueGrey[900],
    },
  },
  typography: {
    ...typoHeaders,
    reverse: {
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#212121',
    },
  },
});

export const themeLight = responsiveFontSizes(light);
export const themeDark = responsiveFontSizes(dark);
