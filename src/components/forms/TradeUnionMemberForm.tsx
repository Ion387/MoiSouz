import React from 'react';
import s from './forms.module.scss';
import { Button, Grid2, InputLabel, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ITradeUnionMember } from '@/models/TradeUnionMember';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { InputDate } from '../ui/form/input-date';

const schema = yup
  .object({
    title: yup.string().required('Обязательное поле'),
    creationDate: yup.string().required('Обязательное поле'),
    date: yup.string().required('Обязательное поле'),
    lastName: yup.string().required('Обязательное поле'),
    firstName: yup.string().required('Обязательное поле'),
    middleName: yup.string().nullable(),
    document: yup.string().required('Обязательное поле'),
    position: yup.string().required('Обязательное поле'),
  })
  .required();

const TradeUnionMemberForm = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSteps,
}: {
  setSteps: (step: number) => void;
}) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  /*const {
    mutate,
    data: resData,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: ITradeUnion) => {
      const session = await getSession();

      return axios.post(`${getBackendUrl}/api/private/tradeunion-owner`, data, {
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      });
    },
  });*/

  const onSubmit: SubmitHandler<ITradeUnionMember> = async () => {
    router.push('/main');
  };

  /*useEffect(() => {
    if (isSuccess) {
      setSteps(3)
      router.push('/main');
    }
  }, [isSuccess]);*/

  return (
    <Paper className={s.paper}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={8}>
                <InputLabel>Номер документа</InputLabel>
                <TextField
                  {...register('document')}
                  placeholder="00213"
                  error={!!errors.document?.message}
                  helperText={errors.document?.message || ''}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel>Дата документа</InputLabel>
                <InputDate name="creationDate" />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Имя</InputLabel>
                <TextField
                  {...register('firstName')}
                  placeholder="Иван"
                  error={!!errors.firstName?.message}
                  helperText={errors.firstName?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Фамилия</InputLabel>
                <TextField
                  {...register('lastName')}
                  placeholder="Иванов"
                  error={!!errors.lastName?.message}
                  helperText={errors.lastName?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Отчество</InputLabel>
                <TextField
                  {...register('middleName')}
                  placeholder="Иванович"
                  error={!!errors.middleName?.message}
                  helperText={errors.middleName?.message || ''}
                />
              </Grid2>
              <Grid2 size={12}>
                <InputLabel>Должность</InputLabel>
                <TextField
                  {...register('position')}
                  placeholder="Бухгалтер"
                  error={!!errors.position?.message}
                  helperText={errors.position?.message || ''}
                />
              </Grid2>
              <Grid2 size={4}>
                <InputLabel>Дата вступления</InputLabel>
                <InputDate name="date" />
              </Grid2>
              <Grid2 size={8}>
                <InputLabel>Наименования профсоюза</InputLabel>
                <TextField
                  {...register('title')}
                  placeholder="Профсоюз"
                  error={!!errors.title?.message}
                  helperText={errors.title?.message || ''}
                />
              </Grid2>
              <Grid2 size={6}>
                <Button
                  variant="outlined"
                  sx={{ width: '100%' }}
                  onClick={() => router.push('/main')}
                >
                  Отменить
                </Button>
              </Grid2>
              <Grid2 size={6}>
                <Button
                  variant="contained"
                  sx={{ width: '100%', padding: '16px 25px' }}
                  type="submit"
                  onClick={() => setSteps && setSteps(3)}
                >
                  Сохранить
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </FormProvider>
      </LocalizationProvider>
    </Paper>
  );
};

export default TradeUnionMemberForm;
