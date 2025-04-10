import React, { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormHelperText,
  Grid2,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';
import s from './forms.module.scss';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getApplications } from '@/services/getApplications';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { getBackendUrl } from '@/constants/url';

const schema = yup
  .object({
    tu: yup.string().required('Выберите Профсоюз'),
  })
  .required();

const MembershipForm = () => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [currentTU, setCurrentTU] = useState<string | null>(null);

  const { data: tus } = useQuery({
    queryKey: ['tradeUnions'],
    queryFn: getApplications,
    select: (data) => data.data.data,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (data: { tu: string }) => {
      const session = await getSession();
      return axios.put(
        `${getBackendUrl}/api/private/tradeunion-user-exists/${data.tu}`,
        { guid: data.tu },
        {
          headers: { Authorization: `Bearer ${session?.user?.token}` },
        },
      );
    },
  });

  useEffect(() => {
    if (currentTU) setValue('tu', currentTU);
  }, [currentTU]);

  const onSubmit: SubmitHandler<{ tu: string }> = async (data) => {
    mutate(data);
  };

  return (
    <Paper className={s.paper}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid2 container spacing={2.5}>
            <Grid2 size={12} sx={{ position: 'relative' }}>
              <Select
                fullWidth
                sx={{
                  padding: 1.6,
                  '& .MuiSelect-select span::before': {
                    content: '"Выберите профсоюз"',
                    opacity: '0.54',
                  },
                }}
                value={currentTU}
                name="tu"
                onChange={(e) => setCurrentTU(e.target.value)}
              >
                {tus &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tus.map((tu: any) => (
                    <MenuItem key={tu.guid} value={tu.guid}>
                      {tu.title}
                    </MenuItem>
                  ))}
              </Select>
              {errors.tu && (
                <FormHelperText
                  sx={{
                    color: '#FF4949',
                    position: 'absolute',
                  }}
                >
                  {errors.tu.message}
                </FormHelperText>
              )}
            </Grid2>

            <Grid2 size={6}>
              <Button
                variant="outlined"
                sx={{
                  width: '100%',
                  padding: '16px 25px',
                  fontSize: '20px',
                  lineHeight: '27px',
                }}
                onClick={() => router.push('/documents')}
              >
                Отменить
              </Button>
            </Grid2>
            <Grid2 size={6}>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  padding: '16px 25px',
                  fontSize: '20px',
                  lineHeight: '27px',
                }}
                type="submit"
              >
                Далее
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </FormProvider>
    </Paper>
  );
};

export default MembershipForm;
