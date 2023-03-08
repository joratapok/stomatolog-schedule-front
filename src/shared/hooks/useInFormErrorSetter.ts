import {useEffect} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {SerializedError} from '@reduxjs/toolkit';
import {ErrorOption} from 'react-hook-form';

type Props<T> = {
  error: FetchBaseQueryError | SerializedError | undefined;
  setError: (key: keyof T, error: ErrorOption) => void;
};

export const useInFormErrorSetter = <T>({error, setError}: Props<T>) => {
  useEffect(() => {
    if (error && 'data' in error) {
      const responseErrors = Object.entries(
        error.data as Record<keyof T, string[]>
      );
      responseErrors.forEach(([key, val]) => {
        // @ts-ignore
        setError(key, {message: val[0]});
      });
    }
  }, [error]);
};
