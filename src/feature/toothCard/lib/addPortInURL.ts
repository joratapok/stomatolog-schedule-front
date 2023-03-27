export const addPortInURL = (url: string | null): string => {
  if (process.env.NODE_ENV === 'development') {
    return url ? url : '';
  }
  if (!url) {
    return '';
  }
  const arrayDomain = url.match(/\/\/[^\/]*/);
  if (!arrayDomain?.length) {
    return url;
  }
  const domain = arrayDomain[0];
  const [start, end] = url.split(domain);

  return start + domain + ':1337/' + end.slice(1);
};
