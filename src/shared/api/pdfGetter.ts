import {instance} from '@box/shared/api/api';

export const pdfGetter = (id: number) => {
  return instance
    .get(`api/events/${id}/pdf/`, {responseType: 'blob'})
    .then((response) => {
      const file = new Blob([response.data], {type: 'application/pdf'});
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      const pdfWindow = window.open();
      if (pdfWindow) {
        pdfWindow.location.href = fileURL;
      }
    });
};
