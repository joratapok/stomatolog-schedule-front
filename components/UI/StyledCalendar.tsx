import {styled} from '@mui/system';
import {Paper} from '@mui/material';

export const StyledCalendarContainer = styled(Paper)(({theme}) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,

  /* ~~~ navigation styles ~~~ */
  '.react-calendar__navigation': {
    display: 'flex',

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
    margin: '2px',
    backgroundColor: theme.palette.primary.main,
    border: 0,
    borderRadius: '3px',
    color: 'white',
    padding: '5px 0px',

    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },

    '&:active': {
      backgroundColor: theme.palette.secondary.main,
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
    color: '#dfdfdf',
  },

  /* ~~~ active day styles ~~~ */
  '.react-calendar__tile--range': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
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
    },
  },
}));
