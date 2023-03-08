import React, {FC} from 'react';
import {differenceInMinutes, format, isWithinInterval} from 'date-fns';
import {EventAbsolute} from '@box/shared/ui/EventAbsolute';
import {CELL_HEIGHT} from '@box/shared/constants';
import {Typography} from '@mui/material';
import {dateParser} from '@box/shared/helpers';
import {CabinetEvent} from '@box/shared/models';

type Props = {
  event: CabinetEvent;
  start: Date;
  end: Date;
  period: number;
  showModalEventDetails: (event: CabinetEvent, cabinetName: string) => void;
  cabinetName: string;
};

export const EventOnTable: FC<Props> = React.memo(
  ({event, start, end, period, showModalEventDetails, cabinetName}) => {
    const eventStart = dateParser(event.dateStart);
    const eventFinish = dateParser(event.dateFinish);
    if (!isWithinInterval(eventStart, {start, end})) {
      return null;
    }
    const textStart = format(eventStart, 'HH:mm');
    const textFinish = format(eventFinish, 'HH:mm');
    const eventMinutes = differenceInMinutes(eventFinish, eventStart);
    const heightFactor = eventMinutes / period;
    const startDiff = differenceInMinutes(eventStart, start);
    const topOffsetFactor = startDiff / period;
    return (
      <EventAbsolute
        onClick={(e) => {
          e.stopPropagation();
          showModalEventDetails(event, cabinetName);
        }}
        sx={{
          height: heightFactor * CELL_HEIGHT - 4,
          top: topOffsetFactor * CELL_HEIGHT + 2,
        }}
      >
        <Typography variant={'reverse'}>
          {`${event.client.lastName} ${textStart} - ${textFinish} 
                                ${event.comment}`}
        </Typography>
      </EventAbsolute>
    );
  }
);
