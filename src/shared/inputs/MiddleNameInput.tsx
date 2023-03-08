import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {EventInput, InputContainer} from '@box/shared/ui';

type Props = {
  control: any;
  error: boolean;
  defaultValue?: string;
  disabled?: boolean;
};

export const MiddleNameInput: FC<Props> = ({
  control,
  error,
  defaultValue,
  disabled,
}) => {
  return (
    <Controller
      rules={{required: true, maxLength: 100}}
      name={'middleName'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <InputContainer>
          <EventInput
            required
            fullWidth
            disabled={disabled}
            defaultValue={defaultValue}
            label={'Отчество'}
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
