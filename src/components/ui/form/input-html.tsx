'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, FormGroup, FormHelperText, InputLabel } from '@mui/material';

import { InputHTML as InputHTMLEditor } from '@/components/ui';

import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

export const InputHTML: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  placeholder,
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
          <Box position="relative">
            <InputHTMLEditor
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled}
              error={error != null}
            />
            <FormHelperText id={`${name}-helper`} error={true}>
              {error && error?.message}
            </FormHelperText>
          </Box>
        )}
      />
    </FormGroup>
  );
};
