import {styled} from '@mui/system';

export const StyledCalendarContainer = styled('div')(({theme}) => ({
  maxWidth: '600px',
  margin: 'auto',
  backgroundColor: theme.palette.background.paper,
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
  'button': {
    'margin': '2px',
    backgroundColor: '#6f876f',
    border: 0,
    borderRadius: '3px',
    'color': 'white',
    'padding': '5px 0',

    '&:hover': {
      backgroundColor: '#556b55',
    },

    '&:active': {
      backgroundColor: '#a5c1a5',
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
    border: 'solid 1px red',
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
