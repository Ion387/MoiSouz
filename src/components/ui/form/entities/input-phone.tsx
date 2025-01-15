'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup, InputLabel } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input';
import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
}

export const InputPhone: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  placeholder,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormGroup sx={sx}>
          {label && <InputLabel>{label}</InputLabel>}
          <MuiTelInput
            sx={
              error
                ? {
                    '&>.MuiFormHelperText-root': {
                      color: '#FF4949',
                    },
                    '&>.Mui-focused': {
                      '&>fieldset': {
                        borderColor: '#FF4949 !important',
                      },
                    },
                    fieldset: {
                      borderColor: '#FF4949',
                    },
                  }
                : {}
            }
            placeholder={placeholder}
            value={value}
            onChange={(value) => onChange(value.replaceAll(' ', ''))}
            disableDropdown
            defaultCountry="RU"
            onlyCountries={['RU']}
            helperText={error && error.message}
          />
        </FormGroup>
      )}
    />
  );
};
