'use client';

import { FC, useMemo } from 'react';
import Image from 'next/image';
import { Box, InputLabel, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form } from '@/components/entities/profile';
import { InputAutocomplete, InputDate, InputImage } from '@/components/ui/form';
import { InputGender } from '@/components/ui/form/entities';

import { useFetchTUOwner, useFetchTUs } from '@/hooks/useTU';

import { IOption } from '@/models/Option';
import { IFormColleagueProfile } from '@/models/Colleague';
import { ITradeUnion } from '@/models/TradeUnion';

const OPTIONS_ROLES: IOption[] = [
  { title: 'Член профкома', id: 'member' },
  { title: 'Председатель профкома', id: 'chairman' },
  { title: 'Руководитель КРК', id: 'director' },
  { title: 'Член КРК', id: 'member-krk' },
];

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(2, 'Минимальная длина имени - 2 символа')
      .required('Введите имя'),
    lastName: yup
      .string()
      .min(2, 'Минимальная длина фамилии - 2 символа')
      .required('Введите фамилию'),
    middleName: yup.string(),

    gender: yup.string().required('Укажите пол'),
    enteryear: yup
      .string()
      .required('Укажите год вступления')
      .typeError('Укажите год вступления'),
    filldate: yup
      .string()
      .required('Укажите дату заполнения/приятия')
      .typeError('Укажите дату заполнения/приятия'),

    tradeunionMainName: yup
      .string()
      .min(2, 'Минимальная длина наименования - 2 символа')
      .required('Введите наименование'),
    tradeunionMainPhone: yup
      .string()
      .min(2, 'Минимальная длина адреса - 2 символа')
      .required('Введите адрес'),
    tradeunionMainAddress: yup
      .string()
      .min(2, 'Минимальная длина телефона - 2 символа')
      .required('Введите телефон'),

    tradeunionTerritoryName: yup
      .string()
      .min(2, 'Минимальная длина наименования - 2 символа')
      .required('Введите наименование'),
    tradeunionTerritoryPhone: yup
      .string()
      .min(2, 'Минимальная длина адреса - 2 символа')
      .required('Введите адрес'),
    tradeunionTerritoryAddress: yup
      .string()
      .min(2, 'Минимальная длина телефона - 2 символа')
      .required('Введите телефон'),

    role: yup.string().required('Укажите роль'),

    tradeunionWasMember: yup.string(),
    acceptdate: yup
      .string()
      .required('Укажите дату принятия')
      .typeError('Укажите дату принятия'),
    releasedate: yup
      .string()
      .required('Укажите дату выхода')
      .typeError('Укажите дату выхода'),
  })
  .required();

interface Props {
  onCancel: () => void;
  onSubmit: (data: IFormColleagueProfile) => Promise<void>;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: IFormColleagueProfile | any;
}

export const ColleagueForm: FC<Props> = ({
  onCancel,
  onSubmit,
  loading,
  defaultValues,
}) => {
  const methods = useForm<IFormColleagueProfile>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const tuOwner = useFetchTUOwner();
  const tuList = useFetchTUs();

  const optionsTuList = useMemo(
    () =>
      tuList?.data
        ? tuList.data.map((el) => ({ id: el.id || -1, title: el.title }))
        : [],
    [tuList],
  );

  const tradeunion: ITradeUnion | undefined = useMemo(
    () =>
      tuOwner && tuList?.data
        ? tuList.data.find((el) => el.guid == tuOwner?.guid)
        : undefined,
    [tuOwner, tuList],
  );

  return (
    <Form
      sx={{ pt: 3 }}
      title="Учётная карточка члена профсоюза"
      loading={loading || isSubmitting}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      methods={methods}
      defaultValues={defaultValues}
      checkTradeUnionMember={false}
    >
      {tradeunion && (
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={2}
          overflow="hidden"
        >
          <Image
            style={{
              borderRadius: 10,
            }}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${tradeunion.logo}`}
            alt=""
            width={110}
            height={110}
          />
          <Box>
            <Typography fontSize={13} color="blue" fontWeight={400}>
              Региональная общественная организация
            </Typography>
            <Typography fontSize={18} color="blue" fontWeight="bold">
              {tradeunion.title}
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <InputLabel>Фамилия</InputLabel>
          <TextField
            {...register('lastName')}
            placeholder="Иванов"
            error={!!errors.lastName?.message}
            helperText={errors.lastName?.message || ''}
          />

          <InputLabel sx={{ mt: 3 }}>Имя</InputLabel>
          <TextField
            {...register('firstName')}
            placeholder="Иван"
            error={!!errors.firstName?.message}
            helperText={errors.firstName?.message || ''}
          />
        </Box>

        <InputImage sx={{ mt: 4, minWidth: '250px' }} name="avatar" disabled />
      </Box>

      <InputLabel sx={{ mt: 3 }}>Отчество</InputLabel>
      <TextField
        {...register('middleName')}
        placeholder="Иванович"
        error={!!errors.middleName?.message}
        helperText={errors.middleName?.message || ''}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <InputGender name="gender" label="Пол" />

        <InputDate
          sx={{ flex: 1 }}
          name="enteryear"
          label="Год вступления"
          views={['year']}
        />

        <InputDate
          sx={{ flex: 1 }}
          name="filldate"
          label="Дата заполнения/приятия"
        />
      </Box>

      <InputLabel sx={{ mt: 3 }}>
        Наименование центрального профоргана
      </InputLabel>
      <TextField
        {...register('tradeunionMainName')}
        placeholder="Введите наименование"
        error={!!errors.tradeunionMainName?.message}
        helperText={errors.tradeunionMainName?.message || ''}
      />

      <InputAutocomplete
        sx={{ mt: 3 }}
        name="role"
        label="Роль члена профсоюза"
        placeholder="Выберите из списка"
        options={OPTIONS_ROLES}
      />

      <InputLabel sx={{ mt: 3 }}>Адрес центрального профоргана</InputLabel>
      <TextField
        {...register('tradeunionMainAddress')}
        placeholder="Введите адрес"
        error={!!errors.tradeunionMainAddress?.message}
        helperText={errors.tradeunionMainAddress?.message || ''}
      />

      <InputLabel sx={{ mt: 3 }}>Телефон центрального профоргана</InputLabel>
      <TextField
        {...register('tradeunionMainPhone')}
        placeholder="+79999999999"
        error={!!errors.tradeunionMainPhone?.message}
        helperText={errors.tradeunionMainPhone?.message || ''}
        slotProps={{ htmlInput: { maxLength: 12 } }}
      />

      <InputLabel sx={{ mt: 3 }}>
        Наименование территориального профоргана
      </InputLabel>
      <TextField
        {...register('tradeunionTerritoryName')}
        placeholder="Введите наименование"
        error={!!errors.tradeunionTerritoryName?.message}
        helperText={errors.tradeunionTerritoryName?.message || ''}
      />

      <InputLabel sx={{ mt: 3 }}>Адрес территориального профоргана</InputLabel>
      <TextField
        {...register('tradeunionTerritoryAddress')}
        placeholder="Введите адрес"
        error={!!errors.tradeunionTerritoryAddress?.message}
        helperText={errors.tradeunionTerritoryAddress?.message || ''}
      />

      <InputLabel sx={{ mt: 3 }}>
        Телефон территориального профоргана
      </InputLabel>
      <TextField
        {...register('tradeunionTerritoryPhone')}
        placeholder="+79999999999"
        error={!!errors.tradeunionTerritoryPhone?.message}
        helperText={errors.tradeunionTerritoryPhone?.message || ''}
        slotProps={{ htmlInput: { maxLength: 12 } }}
      />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: 3,
        }}
      >
        <InputAutocomplete
          sx={{ flex: 1 }}
          name="tradeunionWasMember"
          label="Cостоял в профсоюзе"
          placeholder="Выберите из списка"
          options={optionsTuList}
        />
        <InputDate name="acceptdate" label="Дата принятия" />
        <InputDate name="releasedate" label="Дата выхода" />
      </Box>
    </Form>
  );
};
