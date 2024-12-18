import React from 'react';
import s from './forms.module.scss';
import { Button, Grid2, InputLabel, Paper, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ITradeUnionMember } from '@/models/TradeUnionMember';

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

const TradeUnionMemberForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const router = useRouter();

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
      router.push('/main');
    }
  }, [isSuccess]);*/

  return (
    <Paper className={s.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={2}>
          <Grid2 size={8}>
            <InputLabel>Номер документа</InputLabel>
            <TextField
              {...register('document')}
              placeholder="Профсоюз"
              error={!!errors.document?.message}
              helperText={errors.document?.message || ''}
            />
          </Grid2>
          <Grid2 size={4}>
            <InputLabel>Дата документа</InputLabel>
            <TextField
              {...register('creationDate')}
              placeholder="19.08.1980"
              error={!!errors.creationDate?.message}
              helperText={errors.creationDate?.message || ''}
            />
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
              placeholder="Иван"
              error={!!errors.lastName?.message}
              helperText={errors.lastName?.message || ''}
            />
          </Grid2>
          <Grid2 size={12}>
            <InputLabel>Отчество</InputLabel>
            <TextField
              {...register('middleName')}
              placeholder="Иван"
              error={!!errors.middleName?.message}
              helperText={errors.middleName?.message || ''}
            />
          </Grid2>
          <Grid2 size={12}>
            <InputLabel>Должность</InputLabel>
            <TextField
              {...register('position')}
              placeholder="Иван"
              error={!!errors.position?.message}
              helperText={errors.position?.message || ''}
            />
          </Grid2>
          <Grid2 size={4}>
            <InputLabel>Дата вступления</InputLabel>
            <TextField
              {...register('date')}
              placeholder="19.08.1980"
              error={!!errors.date?.message}
              helperText={errors.date?.message || ''}
            />
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
              onClick={() => reset()}
            >
              Отменить
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button
              variant="contained"
              sx={{ width: '100%', padding: '16px 25px' }}
              type="submit"
            >
              Сохранить
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
};

export default TradeUnionMemberForm;
