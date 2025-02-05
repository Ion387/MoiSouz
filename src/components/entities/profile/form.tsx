/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, PropsWithChildren } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import 'dayjs/locale/ru';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithClassName, PropsWithSX } from '@/models/Props';
import { globalTheme } from '@/styles/theme';

interface Props {
  title?: string;
  buttonCancel?: string | null;
  buttonSubmit?: string;
  loading?: boolean;
  onCancel?: () => void;
  onSubmit: (data: any | undefined) => void;

  /** for FormProvider */
  methods: UseFormReturn<any, any, undefined>;
  defaultValues?: any;

  /**  */
  checkTradeUnionMember?: boolean;
}

export const Form: FC<
  PropsWithChildren & PropsWithClassName & PropsWithSX & Props
> = ({
  children,
  className,
  sx,
  title,
  loading,
  buttonCancel = 'Отмена',
  buttonSubmit = 'Сохранить',
  onCancel,
  onSubmit,
  methods,
  checkTradeUnionMember = true,
}) => {
  const path = usePathname();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ru"
      localeText={
        ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Box
        className={className}
        sx={{
          width: '100%',
          ...(sx || {}),
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid2 container>
              {title && (
                <Grid2 size={9}>
                  <Typography variant="h3">{title}</Typography>
                </Grid2>
              )}
              {checkTradeUnionMember &&
                !path.includes('trade_union_member') && (
                  <Grid2 size={3} container justifyContent={'flex-end'}>
                    <Link href={'/trade_union_member'}>
                      <Button variant="contained">Вступить в профсоюз</Button>
                    </Link>
                  </Grid2>
                )}
            </Grid2>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: title ? 3 : 0,
                p: 2,
                backgroundColor: 'white',
                borderRadius: 6,
              }}
            >
              <fieldset
                style={{
                  border: 'none',
                }}
                disabled={loading}
              >
                {children}
              </fieldset>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 2,
                  gap: 2,
                }}
              >
                {buttonCancel && (
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{
                      padding: '15px 100px',
                      fontSize: '20px',
                      lineHeight: '27px',
                    }}
                    disabled={loading}
                    onClick={onCancel}
                  >
                    {buttonCancel}
                  </Button>
                )}

                {buttonSubmit && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      padding: '15px 100px',
                      fontSize: '20px',
                      lineHeight: '27px',
                      '&.Mui-disabled': {
                        backgroundColor: `${globalTheme.palette.primary.main} !important`,
                        color: 'white !important',
                      },
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" size="27px" />
                    ) : (
                      buttonSubmit
                    )}
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </LocalizationProvider>
  );
};
