export const fullNameCreator = (
  last: string,
  first: string,
  middle: string
) => {
  return `${last ?? ''} ${first && first[0]}.${middle && middle[0]}.`;
};
