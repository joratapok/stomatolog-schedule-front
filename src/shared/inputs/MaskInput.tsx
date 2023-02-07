import React from 'react';
import {IMask, IMaskInput} from 'react-imask';

interface CustomProps {
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
  error: boolean;
}

export const PhoneMaskInput = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
      <IMaskInput
        {...other}
        mask="+7 (###)-###-####"
        definitions={{
          '#': /\d/,
        }}
        // @ts-ignore
        inputRef={ref}
        onAccept={(value: any) => onChange({target: {name: props.name, value}})}
        overwrite
        placeholder={'+7 (987)-654-3210'}
      />
    );
  }
);

export const DateMaskInput = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
      <IMaskInput
        {...other}
        mask={Date}
        pattern={'Y-`m-`d'}
        blocks={{
          d: {mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2},
          m: {mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2},
          Y: {mask: IMask.MaskedRange, from: 1900, to: 2050, maxLength: 4},
        }}
        format={function (date) {
          let day: string | number = date.getDate();
          let month: string | number = date.getMonth() + 1;
          const year = date.getFullYear();

          if (day < 10) {
            day = '0' + day;
          }
          if (month < 10) {
            month = '0' + month.toString();
          }

          return [year, month, day].join('-');
        }}
        parse={function (str) {
          const yearMonthDay: any = str.split('-');
          return new Date(
            yearMonthDay[0],
            yearMonthDay[1] - 1,
            yearMonthDay[2]
          );
        }}
        // @ts-ignore
        inputRef={ref}
        onAccept={(value: any) => onChange({target: {name: props.name, value}})}
        overwrite
        placeholder={'1995-01-25'}
      />
    );
  }
);

export const TimeMaskInput = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const {onChange, ...other} = props;
    return (
      <IMaskInput
        {...other}
        mask="HH{:}`MM"
        blocks={{
          HH: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 23,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
          },
        }}
        // @ts-ignore
        inputRef={ref}
        onAccept={(value: any) => onChange({target: {name: props.name, value}})}
        overwrite
      />
    );
  }
);
