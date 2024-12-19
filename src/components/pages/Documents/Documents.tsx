'use client';

import { Box, InputLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
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

const OPTIONS_EDUCATION: { label: string; value: any }[] = [
  { label: 'Среднее общее', value: 'Среднее общее' },
  { label: 'Среднее профессиональное', value: 'Среднее профессиональное' },
  { label: 'Высшее', value: 'Высшее' },
];

const OPTIONS_HOBBIES: { label: string; value: any }[] = [
  { label: 'Спорт', value: 'Спорт' },
  { label: 'Ходьба', value: 'Ходьба' },
  { label: 'Бег', value: 'Бег' },
  { label: 'Футбол', value: 'Футбол' },
  { label: 'Хоккей', value: 'Хоккей' },
  { label: 'Волейбол', value: 'Волейбол' },
  { label: 'Плавание', value: 'Плавание' },
  { label: 'Бадминтон', value: 'Бадминтон' },
  { label: 'Настольный теннис', value: 'Настольный теннис' },
  { label: 'Большой теннис', value: 'Большой теннис' },
  { label: 'Лыжи', value: 'Лыжи' },
  { label: 'Единоборства', value: 'Единоборства' },
  { label: 'Баскетбол', value: 'Баскетбол' },
  { label: 'Велоспорт', value: 'Велоспорт' },
  { label: 'Спортивное ориентирование', value: 'Спортивное ориентирование' },
  { label: 'Коньки', value: 'Коньки' },
  { label: 'Ролики', value: 'Ролики' },
];

const schema = yup
  .object({
    user: yup.object({
      fname: yup
        .string()
        .min(2, 'Минимальная длина имени - 2 символа')
        .required('Введите имя'),
      lname: yup
        .string()
        .min(2, 'Минимальная длина фамилии - 2 символа')
        .required('Введите фамилию'),
      mname: yup.string(),
      bdate: yup
        .date()
        .required('Укажите дату рождения')
        .typeError('Укажите дату рождения'),
      gender: yup.string().required('Укажите пол'),
      education: yup.string().required('Укажите образование'),
      avatar: yup.mixed().required('Укажите фото'),
    }),
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
      index: yup.string().required('Укажите индекс'),
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
    phoneExtra: yup
      .string()
      .matches(/^\+[0-9]{11}$/, 'Укажите корректный телефон'),
    child: yup.array(
      yup.object({
        name: yup.string().min(2, 'Укажите имя').required('Укажите имя'),
        gender: yup.string().min(2, 'Укажите пол').required('Укажите пол'),
        bdate: yup
          .date()
          .required('Укажите дату рождения')
          .typeError('Укажите дату рождения'),
      }),
    ),
    hobbies: yup
      .array(yup.string().required())
      .required('Укажите увлечения')
      .min(1, 'Укажите увлечения'),
    approval: yup
      .bool()
      .oneOf([true], 'Необходимо принять согласие')
      .required('Необходимо принять согласие'),
  })
  .required();

const DocumentsPage = () => {
  const methods = useForm<IFormProfile>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onCancel = () => {
    console.log('Cancel !?');
  };

  const onSubmit: SubmitHandler<IFormProfile> = async (data) => {
    console.log(data);
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  };
  return (
    <Form
      title="Анктета профиля"
      loading={isSubmitting}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      methods={methods}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <InputLabel>Имя</InputLabel>
          <TextField
            {...register('user.fname')}
            placeholder="Иван"
            error={!!errors.user?.fname?.message}
            helperText={errors.user?.fname?.message || ''}
          />

          <InputLabel sx={{ mt: 3 }}>Фамилия</InputLabel>
          <TextField
            {...register('user.lname')}
            placeholder="Иванов"
            error={!!errors.user?.lname?.message}
            helperText={errors.user?.lname?.message || ''}
          />
        </Box>

        <InputImage sx={{ mt: 4 }} name="user.avatar" label="Добавить фото" />
      </Box>

      <InputLabel sx={{ mt: 3 }}>Отчество</InputLabel>
      <TextField
        {...register('user.mname')}
        placeholder="Иванович"
        error={!!errors.user?.mname?.message}
        helperText={errors.user?.mname?.message || ''}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <InputDate name="user.bdate" label="Дата рождения" />

        <InputGender name="user.gender" label="Пол" defaultValue="female" />

        <InputAutocomplete
          sx={{ width: '100%' }}
          name="user.education"
          label="Образование"
          placeholder="Высшее"
          options={OPTIONS_EDUCATION}
        />
      </Box>

      <InputArray
        sx={{ mt: 3 }}
        name="profession"
        label="Основная профессия"
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
        name="child"
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
            <InputDate name={`${name}.${index}.bdate`} />
          </Box>
        )}
        defaultValue={{}}
      />

      <InputManyModal
        sx={{ mt: 3 }}
        name="hobbies"
        label="Увлечения"
        placeholder="Выберите из списка"
        options={OPTIONS_HOBBIES}
      />

      <InputCheckbox
        sx={{ justifyContent: 'center' }}
        name="approval"
        label={`Я соглашаюсь на обработку персональных данных \r\nСогласие с политикой обработки персональных данных`}
      />
    </Form>
  );
};

export default DocumentsPage;
