import {EventStatus} from '@box/shared/models/IEvents';

export const statusSwitch = (status: string): string => {
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
