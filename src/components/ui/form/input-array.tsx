/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useEffect } from 'react';
import { Box, IconButton, InputLabel } from '@mui/material';
import {
  FieldValues,
  useFieldArray,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';

import { Icon } from '@/components/ui/Icon';
import { PropsWithSX } from '@/models/Props';

interface Props {
  name: string;
  label?: string;
  labelExtra?: string;

  render: (
    name: string,
    index: number,
    register: UseFormRegister<any>,
    errors?: FieldValues,
  ) => ReactNode;
  defaultValue: any;
  preadd?: boolean;
}

export const InputArray: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  labelExtra,
  render,
  defaultValue,
  preadd,
}) => {
  const { control, register, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray<FieldValues>({
    control,
    name,
  });

  const errors: any = formState.errors;

  useEffect(() => {
    if (!preadd) return;
    if (fields.length != 0) return;
    append(defaultValue);
  }, [append]);

  return (
    <Box sx={sx}>
      <Box sx={{ display: 'flex' }}>
        {label && <InputLabel>{label}</InputLabel>}
        <IconButton variant="contained" onClick={() => append(defaultValue)}>
          <Icon name="plus" color="white" />
        </IconButton>
      </Box>
      {fields.length > 0 && (
        <>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {render(name, 0, register, errors[name] && errors[name][0])}
            {preadd != true && (
              <IconButton
                sx={{ mt: 1.2 }}
                variant="contained-gray"
                onClick={() => remove(0)}
              >
                <Icon name="minus" color="white" />
              </IconButton>
            )}
          </Box>
        </>
      )}

      {fields.length > 1 && (
        <>
          {labelExtra && (
            <Box sx={{ display: 'flex', mt: 3 }}>
              <InputLabel>{labelExtra}</InputLabel>
              <IconButton variant="contained-gray" onClick={() => remove(1)}>
                <Icon name="minus" color="white" />
              </IconButton>
            </Box>
          )}
          {fields.map(({ id }, index) =>
            index == 0 ? null : (
              <Box
                key={id}
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: !labelExtra || index > 1 ? 2 : 0,
                }}
              >
                {render(
                  name,
                  index,
                  register,
                  errors[name] && errors[name][index],
                )}
                {(!labelExtra || index > 1) && (
                  <IconButton
                    sx={{ mt: 1.2 }}
                    variant="contained-gray"
                    onClick={() => remove(index)}
                  >
                    <Icon name="minus" color="white" />
                  </IconButton>
                )}
              </Box>
            ),
          )}
        </>
      )}
    </Box>
  );
};
