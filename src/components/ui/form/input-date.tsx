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
  label?: string;
  dis?: boolean;
  isFutureAccess?: boolean;
  views?: DateView[];
}

export const InputDate: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  dis,
  isFutureAccess,
  views,
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
            disabled={!!dis}
            defaultValue={value && dayjs(value, 'DD.MM.YYYY')}
            value={value ? dayjs(value, 'DD.MM.YYYY') : dayjs(null)}
            maxDate={!isFutureAccess ? dayjs() : null}
            onChange={(value: Date) =>
              onChange(dayjs(value).format('DD.MM.YYYY'))
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
            views={views}
          />
        )}
      />
    </FormGroup>
  );
};
