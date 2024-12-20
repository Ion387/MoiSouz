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

export const InputCheckbox: FC<PropsWithSX & Props> = ({ sx, name, label }) => {
  const { control } = useFormContext();

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
                value={value == true}
                checked={value == true}
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
