'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, FormGroup, InputLabel, TextField } from '@mui/material';

import { PropsWithSX } from '@/models/Props';
import { IOption } from '@/models/Option';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: IOption[];
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
            value={options.find((el) => el.id == value) || null}
            getOptionLabel={(option) => option.title}
            onChange={(_, value) => onChange(value?.id)}
            disablePortal
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={placeholder}
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
