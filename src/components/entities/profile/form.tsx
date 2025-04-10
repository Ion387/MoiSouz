/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC, PropsWithChildren, RefObject, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  SxProps,
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
import { Icon, IconName } from '@/components/ui';
import { Theme } from '@mui/system';

interface Props {
  reference?: RefObject<HTMLFormElement | null>;
  title?: string;
  buttonCancel?: string | null;
  buttonSubmit?: string;
  buttonSubmitIcon?: IconName | null;
  buttonSubmitSx?: SxProps<Theme> | null;
  loading?: boolean;
  onCancel?: () => void;
  onSubmit: (data: any | undefined) => void;

  /** for FormProvider */
  methods: UseFormReturn<any, any, undefined>;
  defaultValues?: any;
  errorsExtra?: { [key: string]: string } | null;

  /**  */
  checkTradeUnionMember?: boolean;
}

export const Form: FC<
  PropsWithChildren & PropsWithClassName & PropsWithSX & Props
> = ({
  reference,
  children,
  className,
  sx,
  title,
  loading,
  buttonCancel = 'Отмена',
  buttonSubmit = 'Сохранить',
  buttonSubmitIcon,
  buttonSubmitSx,
  onCancel,
  onSubmit,
  methods,
  errorsExtra,
  checkTradeUnionMember = true,
}) => {
  const path = usePathname();

  useEffect(() => {
    if (errorsExtra == null) return;
    Object.keys(errorsExtra).forEach(
      (key) =>
        methods?.setError(key, { type: 'custom', message: errorsExtra[key] }),
    );
  }, [errorsExtra]);

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
          <form ref={reference} onSubmit={onSubmit}>
            <Grid2 container>
              {title && (
                <Grid2 size={8}>
                  <Typography variant="h3" lineHeight={'57px'}>
                    {title}
                  </Typography>
                </Grid2>
              )}
              {checkTradeUnionMember &&
                !path.includes('trade_union_member') &&
                !path.includes('membership') && (
                  <Grid2
                    size={4}
                    container
                    justifyContent={'flex-end'}
                    flexDirection={'column'}
                    alignItems={'flex-end'}
                    gap={'20px'}
                  >
                    <Link href={'/trade_union_member'}>
                      <Button
                        variant="contained"
                        sx={{
                          padding: '15px 15px',
                          fontSize: '16px',
                          lineHeight: '27px',
                          minWidth: '196px',
                          '&.Mui-disabled': {
                            backgroundColor: `${globalTheme.palette.primary.main} !important`,
                            color: 'white !important',
                          },
                        }}
                      >
                        Вступить в профсоюз
                      </Button>
                    </Link>
                    <Link href={'/membership'}>
                      <Button
                        variant="contained"
                        sx={{
                          padding: '15px 15px',
                          fontSize: '16px',
                          minWidth: '196px',
                          lineHeight: '27px',
                          '&.Mui-disabled': {
                            backgroundColor: `${globalTheme.palette.primary.main} !important`,
                            color: 'white !important',
                          },
                        }}
                      >
                        Я уже в профсоюзе
                      </Button>
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
                      gap: 1,
                      ...(buttonSubmitSx || {}),
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" size="27px" />
                    ) : (
                      <>
                        {buttonSubmitIcon && (
                          <Icon
                            name={buttonSubmitIcon}
                            color="secondary.main"
                          />
                        )}
                        {buttonSubmit}
                      </>
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
