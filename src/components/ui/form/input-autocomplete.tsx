'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, FormGroup, InputLabel, TextField } from '@mui/material';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: { label: string; value: any }[];
}

export const InputAutocomplete: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  placeholder,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormGroup sx={sx}>
          {label && <InputLabel>{label}</InputLabel>}
          <Autocomplete
            value={options.find((el) => el.value == value) || null}
            getOptionLabel={(option) => option.label}
            onChange={(_, value) => onChange(value?.value)}
            disablePortal
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
                onChange={(e) => console.log(e.target)}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </FormGroup>
      )}
    />
  );
};
