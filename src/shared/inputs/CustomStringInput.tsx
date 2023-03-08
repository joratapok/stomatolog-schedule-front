import React, {FC} from 'react';
import {Controller, FieldError} from 'react-hook-form';
import {ErrorMessage, EventInput, InputContainer} from '@box/shared/ui';

type Props = {
  control: any;
  name: string;
  label: string;
  error: FieldError | undefined;
  defaultValue?: string;
  disabled?: boolean;
};

export const CustomStringInput: FC<Props> = ({
  control,
  name,
  label,
  error,
  defaultValue,
  disabled,
}) => {
  return (
    <Controller
      rules={{required: true, maxLength: 100}}
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({field: {onChange, onBlur, value}}) => (
        <InputContainer>
          <EventInput
            required
            fullWidth
            disabled={disabled}
            defaultValue={defaultValue}
            label={label}
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
