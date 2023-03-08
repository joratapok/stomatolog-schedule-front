import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {EventInput, InputContainer} from '@box/shared/ui';

type Props = {
  control: any;
  error: boolean;
};

export const SpecialityInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{maxLength: 100}}
      name={'speciality'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <InputContainer>
          <EventInput
            fullWidth
            label={'Специальность'}
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
