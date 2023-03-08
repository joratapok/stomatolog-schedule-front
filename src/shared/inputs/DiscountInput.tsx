import React, {FC} from 'react';
import {Controller, FieldError} from 'react-hook-form';
import {ErrorMessage, EventInput, InputContainer} from '@box/shared/ui';

type Props = {
  control: any;
  error: FieldError | undefined;
  defaultValue?: number;
  disabled?: boolean;
};

export const DiscountInput: FC<Props> = ({
  control,
  error,
  defaultValue,
  disabled,
}) => {
  return (
    <Controller
      rules={{max: 100, min: 0}}
      name={'discount'}
      control={control}
      defaultValue={defaultValue}
      render={({field: {onChange, onBlur, value}}) => (
        <InputContainer>
          <EventInput
            fullWidth
            type={'number'}
            disabled={disabled}
            label={'Скидка'}
            onChange={onChange}
            value={value}
            error={!!error}
            onBlur={onBlur}
            autoCapitalize={'none'}
          />
          <ErrorMessage isError={!!error?.message} message={error?.message} />
        </InputContainer>
      )}
    />
  );
};
