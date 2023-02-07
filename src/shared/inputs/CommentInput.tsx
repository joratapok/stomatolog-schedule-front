import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {EventInput, InputContainer} from '@box/shared/ui';

type Props = {
  control: any;
  error: boolean;
};

export const CommentInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{maxLength: 150}}
      name={'comment'}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <InputContainer>
          <EventInput
            fullWidth
            autoComplete={'off'}
            label={'Комментарий'}
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
