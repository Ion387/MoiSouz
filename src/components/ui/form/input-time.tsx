'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormGroup, InputLabel } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string;
  dis?: boolean;
  isFutureAccess?: boolean;
}

export const InputTime: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  dis,
}) => {
  const { control } = useFormContext();

  return (
    <FormGroup sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TimePicker
            disabled={!!dis}
            views={['hours', 'minutes', 'seconds']}
            defaultValue={value && dayjs(value, 'hh.mm.ss')}
            value={value ? dayjs(value, 'hh.mm.ss') : dayjs(null)}
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'center',
              },
            }}
            onChange={(value: Date) =>
              onChange(dayjs(value).format('hh.mm.ss'))
            }
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                error: !!error,
                helperText: error?.message,
                inputProps: { readOnly: true },
              },
            }}
          />
        )}
      />
    </FormGroup>
  );
};
