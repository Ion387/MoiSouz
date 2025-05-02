'use client';

import { FC } from 'react';
import { Autocomplete, FormGroup, InputLabel, TextField } from '@mui/material';

import { PropsWithSX } from '@/models/Props';
import { IOption, IOptionValue } from '@/models/Option';

interface Props {
  label?: string;
  placeholder?: string;
  options: IOption[];
  disabled?: boolean;
  error?: string;
  value: IOptionValue | null;
  onChange: (value: IOptionValue | null) => void;
}

export const InputAutocomplete: FC<PropsWithSX & Props> = ({
  sx,
  label,
  placeholder,
  options,
  disabled,
  error,
  value,
  onChange,
}) => {
  return (
    <FormGroup sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <Autocomplete
        value={options.find((el) => el.id == value) || null}
        getOptionLabel={(option) => option.title}
        onChange={(_, value) => onChange(value?.id || null)}
        disablePortal
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            error={error != null}
            helperText={error}
          />
        )}
        disabled={disabled}
      />
    </FormGroup>
  );
};
