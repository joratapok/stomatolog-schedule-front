import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {EventInput} from '@box/shared/ui';

type Props = {
  control: any;
  error: boolean;
};

export const PasswordInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{required: true, maxLength: 100, minLength: 8}}
      name={'password'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <EventInput
          required
          fullWidth
          label={'Пароль'}
          onChange={onChange}
          value={value}
          error={error}
          onBlur={onBlur}
          autoCapitalize={'none'}
        />
      )}
    />
  );
};
