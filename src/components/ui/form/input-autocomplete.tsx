'use client';

import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { InputAutocomplete as BaseInputAutocomplete } from '@/components/ui/input';

import { PropsWithSX } from '@/models/Props';
import { IOption } from '@/models/Option';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: IOption[];
  disabled?: boolean;
  error?: string;
}

export const InputAutocomplete: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  placeholder,
  options,
  disabled,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <BaseInputAutocomplete
          sx={sx}
          label={label}
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          error={error?.message}
        />
      )}
    />
  );
};
