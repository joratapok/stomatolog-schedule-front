import React, {FC} from 'react';
import {Controller, FieldError} from 'react-hook-form';
import {ErrorMessage, EventInput, InputContainer} from '@box/shared/ui';

type Props = {
  control: any;
  error: FieldError | undefined;
};

export const LastNameBaseInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{required: true, maxLength: 100}}
      name={'lastName'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <InputContainer>
          <EventInput
            required
            fullWidth
            label={'Фамилия'}
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
