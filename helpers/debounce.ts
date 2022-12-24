type Props = {
  fn: (text: string) => void;
  delay: number;
};

export const debounce = ({fn, delay}: Props) => {
  let isBusy = false;
  let savedText = '';
  return (text: string) => {
    if (isBusy) {
      savedText = text;
      return;
    }
    fn(text);
    isBusy = true;
    savedText = text;
    setTimeout(() => {
      isBusy = false;
      fn(savedText);
    }, delay);
  };
};
