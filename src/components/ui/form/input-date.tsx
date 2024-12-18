'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string;
}

export const InputDate: FC<PropsWithSX & Props> = ({ sx, name, label }) => {
  const { control } = useFormContext();

  return (
    <FormGroup sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DatePicker
            sx={{ minWidth: 230 }}
            value={value}
            onChange={onChange}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                error: !!error,
                helperText: error?.message,
              },
            }}

            //defaultValue={new Date()}
          />
        )}
      />
    </FormGroup>
  );
};
