import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {MultiSelectClinics} from './MultiSelectClinics';

type Props = {
  control: any;
  error: boolean;
  defaultValue?: number[];
  clinics: {id: number; name: string}[];
};

export const ClinicsInput: FC<Props> = ({
  control,
  error,
  defaultValue,
  clinics,
}) => {
  return (
    <Controller
      rules={{required: true}}
      name={'clinic'}
      defaultValue={defaultValue}
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <MultiSelectClinics
          onBlur={onBlur}
          value={value ?? []}
          onChange={onChange}
          clinics={clinics}
          error={error}
        />
      )}
    />
  );
};
