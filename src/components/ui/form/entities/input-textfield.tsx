'use client';

import { FC } from 'react';

import { InputLabel, TextField } from '@mui/material';
import { PropsWithSX } from '@/models/Props';
import { useIMask } from 'react-imask';

interface Props {
  label?: string;
  placeholder?: string;
  error?: string;
  maxL: number;
  disabled?: boolean;
  fullWidth?: boolean;
  register: object;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: any;
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
  onChange,
}) => {
  const { ref } = useIMask({
    mask: '0'.repeat(maxL),
    prepare: (value) => value.replace(/[^0-9]/g, ''),
    maxLength: maxL,
    max: 99999999999999999999999999,
  });
  return (
    <>
      {label && <InputLabel error={error != null}>{label}</InputLabel>}
      {!onChange ? (
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
      ) : (
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
          onChange={onChange}
        />
      )}
    </>
  );
};
