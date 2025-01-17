'use client';

import { FC, useEffect } from 'react';
import { Box, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form } from '@/components/entities/profile';
import {
  InputAutocomplete,
  InputArray,
  InputDate,
  InputCheckbox,
  InputImage,
  InputManyModal,
} from '@/components/ui/form';
import {
  InputAddress,
  InputGender,
  InputPhone,
} from '@/components/ui/form/entities';

import { IFormProfile } from '@/models/Forms';
import { IOption } from '@/models/Option';
import { useOptions } from '@/hooks/UseOptions';
import { useRouter } from 'next/navigation';

const OPTIONS_EDUCATION: IOption[] = [
  { title: 'Среднее общее', id: 'Среднее общее' },
  { title: 'Среднее профессиональное', id: 'Среднее профессиональное' },
  { title: 'Высшее', id: 'Высшее' },
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
    birthdate: yup
      .string()
      .required('Укажите дату рождения')
      .typeError('Укажите дату рождения'),
    gender: yup.string().required('Укажите пол'),
    education: yup.string().required('Укажите образование'),
    avatar: yup.mixed().required('Укажите фото'),
    profession: yup
      .array(
        yup.string().min(2, 'Укажите профессию').required('Укажите профессию'),
      )
      .required(),
    position: yup
      .array(
        yup.string().min(2, 'Укажите должность').required('Укажите должность'),
      )
      .required(),
    address: yup.object({
      postcode: yup.string().required('Укажите индекс'),
      region: yup.string().required('Укажите регион'),
      municipal: yup.string().required('Укажите муниципальное образование'),
      locality: yup.string().required('Укажите населенный пункт'),
      street: yup.string().required('Укажите улицу'),
      house: yup.string().required('Укажите дом/здание'),
      flat: yup.string(),
    }),
    phone: yup
      .string()
      .matches(/^\+[0-9]{11}$/, 'Укажите корректный телефон')
      .required('Укажите телефон'),
    phoneDop: yup
      .string()
      .nullable()
      .matches(/^\+[0-9]{11}$/, 'Укажите корректный телефон'),
    children: yup.array(
      yup.object({
        name: yup.string().min(2, 'Укажите имя').required('Укажите имя'),
        gender: yup.string().min(2, 'Укажите пол').required('Укажите пол'),
        birthdate: yup
          .string()
          .required('Укажите дату рождения')
          .typeError('Укажите дату рождения'),
      }),
    ),
    hobbies: yup
      .array(yup.number().required())
      .required('Укажите увлечения')
      .min(1, 'Укажите увлечения'),
    isActive: yup
      .bool()
      .oneOf([true], 'Необходимо принять согласие')
      .required('Необходимо принять согласие'),
  })
  .required();

interface Props {
  onCancel: () => void;
  onSubmit: (data: IFormProfile) => Promise<void>;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: IFormProfile | any;
}

const ProfileForm: FC<Props> = ({
  onCancel,
  onSubmit,
  loading,
  defaultValues,
}) => {
  const methods = useForm<IFormProfile>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const { data: hobbies } = useOptions({ name: 'hobbies' });
  const router = useRouter();

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push('/documents');
    }
  }, [isSubmitSuccessful]);

  return (
    <Form
      title="Анкета профиля"
      loading={loading || isSubmitting}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      methods={methods}
      defaultValues={defaultValues}
    >
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

        <InputImage sx={{ mt: 4 }} name="avatar" label="Добавить фото" />
      </Box>

      <InputLabel sx={{ mt: 3 }}>Отчество</InputLabel>
      <TextField
        {...register('middleName')}
        placeholder="Иванович"
        error={!!errors.middleName?.message}
        helperText={errors.middleName?.message || ''}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <InputDate name="birthdate" label="Дата рождения" />

        <InputGender name="gender" label="Пол" />

        <InputAutocomplete
          sx={{ width: '80%' }}
          name="education"
          label="Образование"
          placeholder="Высшее"
          options={OPTIONS_EDUCATION}
        />
      </Box>

      <InputArray
        sx={{ mt: 3 }}
        name="profession"
        label="Специальность по образованию"
        labelExtra="Дополнительная профессия"
        render={(name, index, register, errors) => (
          <TextField
            {...register(`${name}.${index}`)}
            placeholder="Профессия"
            error={!!errors?.message}
            helperText={errors?.message || ''}
          />
        )}
        defaultValue=""
        preadd
      />

      <InputArray
        sx={{ mt: 3 }}
        name="position"
        label="Должность"
        labelExtra="Дополнительная должность"
        render={(name, index, register, errors) => (
          <TextField
            {...register(`${name}.${index}`)}
            placeholder="Должность"
            error={!!errors?.message}
            helperText={errors?.message || ''}
          />
        )}
        defaultValue=""
        preadd
      />

      <InputAddress
        sx={{ mt: 3 }}
        name="address"
        label="Адрес проживания"
        errors={errors}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <InputPhone sx={{ flex: 1 }} name="phone" label="Номер телефона" />
        <InputPhone sx={{ flex: 1 }} name="phoneExtra" label="Доп. номер" />
      </Box>

      <InputArray
        sx={{ mt: 3 }}
        name="children"
        label="Дети"
        render={(name, index, register, errors) => (
          <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
            <TextField
              {...register(`${name}.${index}.name`)}
              placeholder="Имя"
              error={!!errors?.name?.message}
              helperText={errors?.name?.message || ''}
            />
            <InputGender
              name={`${name}.${index}.gender`}
              defaultValue="female"
            />
            <InputDate name={`${name}.${index}.birthdate`} />
          </Box>
        )}
        defaultValue={{}}
      />

      <InputManyModal
        sx={{ mt: 3 }}
        name="hobbies"
        label="Увлечения"
        placeholder="Выберите из списка"
        options={hobbies?.data || []}
      />

      <InputCheckbox
        sx={{ justifyContent: 'center' }}
        name="isActive"
        link={'/Политика_в_отношении_обработки_персональных_данных.pdf'}
        label={`Я соглашаюсь с политикой обработки персональных данных `}
      />
    </Form>
  );
};

export default ProfileForm;
