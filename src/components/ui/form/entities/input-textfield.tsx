'use client';

import { FC } from 'react';

import { InputLabel, TextField } from '@mui/material';
import { PropsWithSX } from '@/models/Props';
import { useIMask } from 'react-imask';

interface Props {
  label?: string;
  placeholder?: string;
  error?: string;
  maxL?: number;
  disabled?: boolean;
  fullWidth?: boolean;
  register: object;
}

export const TextFieldCustom: FC<PropsWithSX & Props> = ({
  sx,
  label,
  placeholder,
  error,
  maxL,
  disabled,
  fullWidth,
  register,
}) => {
  const { ref } = useIMask({
    mask: Number,
    maxLength: maxL,
    max: 99999999999999999999999999,
  });
  if (error) console.log(error);
  return (
    <>
      {label && <InputLabel error={error != null}>{label}</InputLabel>}
      <TextField
        sx={{
          ...(sx || {}),
        }}
        {...register}
        placeholder={placeholder}
        error={!!error}
        helperText={error || ''}
        disabled={disabled}
        fullWidth={fullWidth}
        slotProps={{ htmlInput: { maxLength: maxL, ref: ref } }}
      />
    </>
  );
};
