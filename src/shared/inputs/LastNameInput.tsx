import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {EventInput, InputContainer} from '@box/shared/ui';

type Props = {
  control: any;
  error: boolean;
  defaultValue?: string;
};

export const LastNameInput: FC<Props> = ({control, error, defaultValue}) => {
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
            defaultValue={defaultValue}
            label={'Фамилия'}
            onChange={onChange}
            value={value}
            error={error}
            onBlur={onBlur}
            autoCapitalize={'none'}
          />
        </InputContainer>
      )}
    />
  );
};
