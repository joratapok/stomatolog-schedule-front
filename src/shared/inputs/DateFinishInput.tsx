import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {EventInput} from '@box/shared/ui';

type Props = {
  control: any;
  error: boolean;
};

export const DateFinishInput: FC<Props> = ({control, error}) => {
  return (
    <Controller
      rules={{
        required: true,
        maxLength: 3,
        validate: (val) => parseInt(val) < 600 && parseInt(val) > 0,
      }}
      name={'dateFinish'}
      control={control}
      defaultValue={''}
      render={({field: {onChange, onBlur, value}}) => (
        <EventInput
          required
          fullWidth
          type={'number'}
          label={'длительность мин.'}
          onChange={(duration) => {
            onChange(duration.target.value);
          }}
          value={value}
          error={error}
          onBlur={onBlur}
          autoCapitalize={'none'}
          inputProps={{type: 'numeric'}}
        />
      )}
    />
  );
};
