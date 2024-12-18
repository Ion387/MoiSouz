'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup, InputLabel, TextField } from '@mui/material';
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
                      color: '#d32f2f',
                    },
                    '&>.Mui-focused': {
                      '&>fieldset': {
                        borderColor: '#d32f2f !important',
                      },
                    },
                    fieldset: {
                      borderColor: '#d32f2f',
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
