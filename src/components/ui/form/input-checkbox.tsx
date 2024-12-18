'use client';

import { FC, ReactNode, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: ReactNode;
  defaultValue?: boolean;
}

export const InputCheckbox: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  defaultValue,
}) => {
  const { control, getValues, setValue } = useFormContext();

  useEffect(() => {
    if (getValues(name) != null) return;
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <Box sx={{ display: 'flex', ...(sx || {}) }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <FormControlLabel
            control={
              <Checkbox
                sx={{ color: error ? '#d32f2f' : null }}
                size="large"
                value={value}
                onChange={onChange}
              />
            }
            label={
              <Typography whiteSpace="break-spaces" fontSize={14}>
                {label}
              </Typography>
            }
          />
        )}
      />
    </Box>
  );
};
