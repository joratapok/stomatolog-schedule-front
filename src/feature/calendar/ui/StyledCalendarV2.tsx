import {alpha, styled} from '@mui/system';
import {Paper} from '@mui/material';

export const StyledCalendarV2 = styled(Paper)(({theme}) => ({
  margin: 'auto',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,

  /* ~~~ navigation styles ~~~ */
  '.react-calendar__navigation': {
    display: 'flex',
    marginBottom: theme.spacing(1),

    '.react-calendar__navigation__label': {
      fontWeight: 'bold',
    },

    '.react-calendar__navigation__arrow': {
      flexGrow: 0.333,
    },
  },

  /* ~~~ label styles ~~~ */
  '.react-calendar__month-view__weekdays__weekday': {
    textAlign: 'center',
    'abbr[title]': {
      textDecoration: 'none',
    },
  },

  /* ~~~ button styles ~~~ */
  button: {
    backgroundColor: 'transparent',
    border: 0,
    color: theme.palette.text.primary,
    padding: '8px 0px',
    borderRadius: theme.shape.borderRadius,

    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
      // color: theme.palette.secondary.contrastText,
    },

    '&:active': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  /* ~~~ day grid styles ~~~ */
  '.react-calendar__month-view__days': {
    display: 'grid !important',
    gridTemplateColumns: '14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%',

    '.react-calendar__tile': {
      maxWidth: 'initial !important',
    },
  },

  /* ~~~ neighboring month & weekend styles ~~~ */
  '.react-calendar__month-view__days__day--neighboringMonth': {
    opacity: '0.7',
  },
  '.react-calendar__month-view__days__day--weekend': {
    color: theme.palette.error.main,
  },

  /* ~~~ active day styles ~~~ */
  '.react-calendar__tile--range': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  /* ~~~ other view styles ~~~ */
  [`.react-calendar__year-view__months, 
  .react-calendar__decade-view__years, 
  .react-calendar__century-view__decades`]: {
    display: 'grid !important',
    gridTemplateColumns: '20% 20% 20% 20% 20%',

    '&.react-calendar__year-view__months': {
      gridTemplateColumns: '33.3% 33.3% 33.3%',
    },

    '.react-calendar__tile': {
      maxWidth: 'initial !important',
      backgroundColor: 'transparent',
      padding: '10px 6.6667px',
    },
  },
}));
