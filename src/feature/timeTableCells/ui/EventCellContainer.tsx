import React, {FC} from 'react';
import {areIntervalsOverlapping} from 'date-fns';
import {CabinetEvent, ICabinet, IDoctor, IDutyShift} from '@box/shared/models';
import {dateParser} from '@box/shared/helpers';
import {EventOnTable} from '@box/feature/timeTableCells';
import {EventCell, TypoContent} from '@box/shared/ui';
import {doctorFinder} from '@box/widgets/timeTable/helpers/doctorFinder';

type Props = {
  cabinet: ICabinet;
  start: Date;
  end: Date;
  period: number;
  doctors: IDoctor[];
  createEvent: (
    start: Date,
    cabinet: ICabinet,
    dutyShift: IDutyShift | undefined
  ) => void;
  showModalEventDetails: (event: CabinetEvent, cabinetName: string) => void;
};

export const EventCellContainer: FC<Props> = React.memo(
  ({
    cabinet,
    start,
    end,
    period,
    doctors,
    createEvent,
    showModalEventDetails,
  }) => {
    const dutyShift = cabinet.dutyShift.find((duty: IDutyShift) => {
      const dutyStart = dateParser(duty.dateStart);
      const dutyFinish = dateParser(duty.dateFinish);
      return areIntervalsOverlapping(
        {start, end},
        {start: dutyStart, end: dutyFinish}
      );
    });
    return (
      <EventCell
        isonduty={!!dutyShift ? 'true' : undefined}
        onClick={() => createEvent(start, cabinet, dutyShift)}
        align="center"
      >
        {!!dutyShift && (
          <TypoContent>{doctorFinder(dutyShift.doctor, doctors)}</TypoContent>
        )}
        {cabinet?.cabinetEvents?.map((el) => {
          return (
            <EventOnTable
              key={el.id}
              event={el}
              start={start}
              end={end}
              period={period}
              showModalEventDetails={showModalEventDetails}
              cabinetName={cabinet.name}
            />
          );
        })}
      </EventCell>
    );
  }
);
