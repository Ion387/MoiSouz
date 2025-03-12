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
  desc?: string;
}

export const InputArrayOfObjects: FC<PropsWithSX & Props> = ({
  sx,
  name,
  label,
  labelExtra,
  render,
  defaultValue,
  desc,
}) => {
  const { control, register, formState } = useFormContext();
  const { fields, append, remove } = useFieldArray<FieldValues>({
    control,
    name,
  });

  const errors: any = formState.errors;

  useEffect(() => {
    if (fields.length != 0) return;
    if (fields.length == 0) append(defaultValue);
  }, []);

  return (
    <Box sx={sx}>
      {!!fields.length && (
        <>
          {labelExtra && (
            <Box sx={{ display: 'flex', mt: 3 }}>
              <InputLabel>{labelExtra}</InputLabel>
              <IconButton variant="contained-gray" onClick={() => remove(1)}>
                <Icon name="minus" color="white" />
              </IconButton>
            </Box>
          )}

          {fields.map(({ id }, index) => (
            <Box
              key={id}
              sx={{
                display: 'flex',
                gap: 2,
                mt: !labelExtra || index > 1 ? 2 : 0,
                position: 'relative',
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
                  sx={{
                    mt: 1.2,
                    position: 'absolute',
                    top: '-16px',
                    right: '0px',
                  }}
                  variant="contained-gray"
                  onClick={() => remove(index)}
                >
                  <Icon name="minus" color="white" />
                </IconButton>
              )}
            </Box>
          ))}
        </>
      )}

      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <InputLabel
          sx={{
            maxWidth: 'fit-content',
            pr: '12px',
            mb: 0,
            lineHeight: '32px',
          }}
        >
          {desc}
        </InputLabel>
        <IconButton variant="contained" onClick={() => append(defaultValue)}>
          <Icon name="plus" color="white" />
        </IconButton>
      </Box>
    </Box>
  );
};
