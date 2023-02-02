import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {EventInput} from '@box/shared/ui';

type Props = {
  control: any;
  error: boolean;
};

export const UserNameInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{required: true, maxLength: 100}}
      name={'username'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <EventInput
          required
          fullWidth
          label={'Почта'}
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
