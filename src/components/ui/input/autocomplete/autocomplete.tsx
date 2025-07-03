'use client';

import { FC } from 'react';
import { Autocomplete, FormGroup, InputLabel, TextField } from '@mui/material';

import { PropsWithSX } from '@/models/Props';
import { IOption, IOptionValue } from '@/models/Option';

type Props = {
  label?: string | React.ReactNode;
  placeholder?: string;
  options: IOption[];
  disabled?: boolean;
  error?: string;
  freeSolo?: boolean;
} & (PropsSingle | PropsMultiple);

interface PropsSingle {
  multiple?: false;
  value: IOptionValue | null;
  onChange: (value: IOptionValue | null) => void;
}

interface PropsMultiple {
  multiple: true;
  value: IOptionValue[];
  onChange: (value: IOptionValue[]) => void;
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
          multiple == true
            ? onChange((value as IOption[]).map((el) => el.id))
            : onChange((value as IOption).id)
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
