'use client';

import { FC } from 'react';
import { Autocomplete, FormGroup, InputLabel, TextField } from '@mui/material';

import { PropsWithSX } from '@/models/Props';
import { IOption, IOptionValue } from '@/models/Option';

interface Props {
  label?: string | React.ReactNode;
  placeholder?: string;
  options: IOption[];
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  value: IOptionValue | IOptionValue[] | null;
  onChange: (value: IOptionValue | IOptionValue[] | null) => void;
  freeSolo?: boolean;
}

export const InputAutocomplete: FC<PropsWithSX & Props> = ({
  sx,
  label,
  placeholder,
  options,
  multiple,
  disabled,
  error,
  value,
  onChange,
  freeSolo,
}) => {
  return (
    <FormGroup sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <Autocomplete
        freeSolo={freeSolo ? freeSolo : false}
        value={
          (value &&
            (multiple
              ? options.filter((el) =>
                  (value as IOptionValue[]).includes(el.id),
                )
              : options.find((el) => el.id == value))) ||
          (multiple ? [] : null)
        }
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.title
        }
        onChange={(_, value) =>
          onChange(
            (multiple
              ? (value as IOption[]).map((el) => el.id)
              : (value as IOption).id) || (multiple ? [] : null),
          )
        }
        disablePortal
        multiple={multiple}
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
