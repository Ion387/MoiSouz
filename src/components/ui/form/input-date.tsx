'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { PropsWithSX } from '@/models/Props';
import { DateView } from '@mui/x-date-pickers/models';

interface Props {
  name: string;
  label?: React.ReactNode;
  dis?: boolean;
  isFutureAccess?: boolean;
  views?: DateView[];
  disabled?: boolean;
}

export const InputDate: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  dis,
  isFutureAccess,
  views,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <FormGroup sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DatePicker
            disabled={!!dis || disabled}
            value={value ? dayjs(value, 'DD.MM.YYYY') : null}
            maxDate={!isFutureAccess ? dayjs() : undefined}
            onChange={(date) => {
              onChange(date ? date.format('DD.MM.YYYY') : null);
            }}
            onAccept={(date) => {
              onChange(date ? date.format('DD.MM.YYYY') : null);
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                error: !!error,
                helperText: error?.message,
                inputProps: {
                  placeholder: 'DD.MM.YYYY',
                },
              },
            }}
            format="DD.MM.YYYY"
            views={views}
          />
        )}
      />
    </FormGroup>
  );
};
