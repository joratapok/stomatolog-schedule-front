import {EventStatus} from '../models/events/ICreateEvent';

export const statusSwitch = (status: string): string => {
  console.log('status in switch', status, EventStatus.NOT_CONFIRMED);
  switch (status) {
    case EventStatus.NOT_CONFIRMED:
      return 'Не подтверждено';
    case EventStatus.CONFIRMED:
      return 'Подтверждено';
    case EventStatus.RECEPTION_COMPLETED:
      return 'Прием завершен';
    case EventStatus.CANCELED:
      return 'Отменен';
    case EventStatus.NO_SHOW:
      return 'Неявка';
    default:
      return 'Не подтверждено';
  }
};
