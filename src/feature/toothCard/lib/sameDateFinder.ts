import {ITeeth} from '@box/shared/models';

export const sameDateFinder = (array: ITeeth[], currentIndex: number) => {
  let counter = 2;
  while (true) {
    if (currentIndex + counter > array.length - 1) {
      break;
    }
    if (
      array[currentIndex + counter].event.dateStart ===
      array[currentIndex].event.dateStart
    ) {
      counter++;
    } else {
      break;
    }
  }
  return counter;
};
