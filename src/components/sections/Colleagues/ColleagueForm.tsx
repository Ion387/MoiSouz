'use client';

import { FC, useMemo } from 'react';
import { Box, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form } from '@/components/entities/profile';
import {
  InputArray,
  InputAutocomplete,
  InputCheckbox,
  InputDate,
  InputFile,
  InputImage,
  InputManyModal,
} from '@/components/ui/form';
import { InputAddress, InputGender } from '@/components/ui/form/entities';
import { TradeUnionCardSimple } from './TradeUnionCardSimple';

import { useFetchTUOwner, useFetchTUs } from '@/hooks/useTU';
import { useOptions } from '@/hooks/UseOptions';

import { IFormColleagueProfile } from '@/models/Colleague';
import { ITradeUnion } from '@/models/TradeUnion';
import { OPTIONS_EDUCATION, OPTIONS_ROLES } from '@/constants/options';

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
    middleName: yup
      .string()
      .min(2, 'Минимальная длина Отчества - 2 символа')
      .required('Введите отчество'),
    birthdate: yup
      .string()
      .required('Укажите дату рождения')
      .typeError('Укажите дату рождения'),
    gender: yup.string().required('Укажите пол'),
    education: yup.string().required('Укажите образование'),
    avatar: yup
      .mixed()
      .nullable()
      .test('fileSize', 'Максимальный размер - 1 МБ.', (value) => {
        if (!value || typeof value === 'string') return true;
        //@ts-expect-error none
        return convertSizeToBites(value.size) <= 1048576;
      }),
    profession: yup.array(
      yup.string().min(2, 'Укажите профессию').required('Укажите профессию'),
    ),
    position: yup
      .array(
        yup.string().min(2, 'Укажите должность').required('Укажите должность'),
      )
      .required(),
    address: yup.object({
      postcode: yup.string().nullable(),
      region: yup.string().nullable(),
      municipal: yup.string().nullable(),
      locality: yup.string().nullable(),
      street: yup.string().nullable(),
      house: yup.string().nullable(),
      flat: yup.string().nullable(),
    }),
    phone: yup
      .string()
      .matches(/^(\+7|7|8)+([0-9]){10}$/, 'Укажите корректный телефон')
      .required('Укажите телефон'),
    phoneDop: yup
      .string()
      .nullable()
      .transform((_, value) => (value?.length > 0 ? value : null))
      .matches(/^(\+7|7|8)+([0-9]){10}$/, 'Укажите корректный телефон'),
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
      .transform((value) => (value ? value : [])),
    isActive: yup.bool(),
    email: yup.string().email('Укажите почту').required('Укажите почту'),
    role: yup.string().required('Укажите роль'),
    reason: yup.string(),
    history: yup.array(
      yup.object({
        name: yup
          .string()
          .min(2, 'Укажите название')
          .required('Укажите название'),
        startDate: yup
          .string()
          .required('Укажите дату принятия')
          .typeError('Укажите дату принятия'),
        finishDate: yup
          .string()
          .required('Укажите дату выхода')
          .typeError('Укажите дату выхода'),
      }),
    ),
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

  const { data: hobbies } = useOptions({ name: 'hobbies' });

  const tuOwner = useFetchTUOwner();
  const tuList = useFetchTUs();

  const tradeunion: ITradeUnion | undefined = useMemo(
    () =>
      tuOwner && tuList?.data
        ? tuList.data.find((el) => el.guid == tuOwner?.guid)
        : undefined,
    [tuOwner, tuList],
  );

  const isEdit = defaultValues != null;

  return (
    <Form
      sx={{ pt: 3 }}
      title={
        isEdit
          ? 'Учётная карточка члена профсоюза'
          : 'Добавление учётной карточки члена профсоюза'
      }
      loading={loading || isSubmitting}
      onCancel={onCancel}
      buttonSubmit={defaultValues ? undefined : 'Добавить'}
      onSubmit={handleSubmit(onSubmit)}
      methods={methods}
      defaultValues={defaultValues}
      checkTradeUnionMember={false}
    >
      {tradeunion && <TradeUnionCardSimple data={tradeunion} />}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <InputLabel>Фамилия</InputLabel>
          <TextField
            {...register('lastName')}
            placeholder="Иванов"
            error={!!errors.lastName?.message}
            helperText={errors.lastName?.message || ''}
            disabled={isEdit}
          />

          <InputLabel sx={{ mt: 3 }}>Имя</InputLabel>
          <TextField
            {...register('firstName')}
            placeholder="Иван"
            error={!!errors.firstName?.message}
            helperText={errors.firstName?.message || ''}
            disabled={isEdit}
          />
          <InputLabel sx={{ mt: 3 }}>Отчество</InputLabel>
          <TextField
            {...register('middleName')}
            placeholder="Иванович"
            error={!!errors.middleName?.message}
            helperText={errors.middleName?.message || ''}
            disabled={isEdit}
          />
        </Box>

        <InputImage sx={{ mt: 4, minWidth: '250px' }} name="avatar" disabled />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <InputDate name="birthdate" label="Дата рождения" disabled={isEdit} />

        <InputGender name="gender" label="Пол" disabled={isEdit} />

        <InputAutocomplete
          sx={{ width: '80%' }}
          name="education"
          label="Образование"
          placeholder="Выберите из списка"
          options={OPTIONS_EDUCATION}
          disabled={isEdit}
        />
      </Box>

      <InputArray
        sx={{ mt: 3 }}
        name="profession"
        label="Специальность по образованию"
        labelExtra="Дополнительная профессия"
        desc="Добавить специальность"
        render={(name, index, register, errors) => (
          <TextField
            {...register(`${name}.${index}`)}
            placeholder="Профессия"
            error={!!errors?.message}
            helperText={errors?.message || ''}
            disabled={isEdit}
          />
        )}
        defaultValue=""
        disabled={isEdit}
      />

      <InputArray
        sx={{ mt: 3 }}
        name="position"
        label="Должность"
        labelExtra="Дополнительная должность"
        desc="Добавить должность"
        render={(name, index, register, errors) => (
          <TextField
            {...register(`${name}.${index}`)}
            placeholder="Должность"
            error={!!errors?.message}
            helperText={errors?.message || ''}
            disabled={isEdit}
          />
        )}
        defaultValue=""
        preadd
        disabled={isEdit}
      />

      <InputAddress
        sx={{ mt: 3 }}
        name="address"
        label="Адрес проживания"
        errors={errors}
        disabled={isEdit}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Box sx={{ flex: 1 }}>
          <InputLabel>Номер телефона</InputLabel>
          <TextField
            {...register('phone')}
            placeholder="+79999999999"
            error={!!errors.phone?.message}
            helperText={errors.phone?.message || ''}
            slotProps={{ htmlInput: { maxLength: 12 } }}
            disabled={isEdit}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <InputLabel>Доп. номер</InputLabel>
          <TextField
            {...register('phoneDop')}
            placeholder="+79999999999"
            error={!!errors.phoneDop?.message}
            helperText={errors.phoneDop?.message || ''}
            slotProps={{ htmlInput: { maxLength: 12 } }}
            disabled={isEdit}
          />
        </Box>
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
              disabled={isEdit}
            />
            <InputGender
              name={`${name}.${index}.gender`}
              defaultValue="female"
              disabled={isEdit}
            />
            <InputDate name={`${name}.${index}.birthdate`} disabled={isEdit} />
          </Box>
        )}
        defaultValue={{}}
        disabled={isEdit}
      />

      <InputLabel sx={{ mt: 3 }}>Почта</InputLabel>
      <TextField
        {...register('email')}
        placeholder="Почта"
        error={!!errors.email?.message}
        helperText={errors.email?.message || ''}
        disabled={isEdit}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <InputAutocomplete
          sx={{ flex: 1 }}
          name="role"
          label="Роль"
          placeholder="Выберите из списка"
          options={OPTIONS_ROLES}
        />
        <InputAutocomplete
          sx={{ flex: 1 }}
          name="reason"
          label="Основание, на котором присвоена роль"
          placeholder="Выберите из списка"
          options={OPTIONS_ROLES}
        />
      </Box>

      <InputFile
        sx={{ mt: 2 }}
        name="reasonFile"
        label={
          <span>
            Прикрепить Документ, на основании коротого присвоена роль <br />
            (документ в формате pdf)
          </span>
        }
        accept=".pdf"
        imageSelect="pdf"
        type="secondary"
      />

      <InputArray
        sx={{ mt: 3 }}
        name="history"
        label="История участия в профсоюзных организациях"
        render={(name, index, register, errors) => (
          <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <InputLabel>Cостоял в профсоюзе</InputLabel>
              <TextField
                {...register(`${name}.${index}.name`)}
                placeholder="Название профсоюзной организации"
                error={!!errors?.name?.message}
                helperText={errors?.name?.message || ''}
                disabled={isEdit}
              />
            </Box>
            <InputDate
              sx={{ flex: 0.4 }}
              name={`${name}.${index}.startDate`}
              label="Дата принятия"
              disabled={isEdit}
            />
            <InputDate
              sx={{ flex: 0.4 }}
              name={`${name}.${index}.finishDate`}
              label="Дата выхода"
              disabled={isEdit}
            />
          </Box>
        )}
        defaultValue={{}}
        disabled={isEdit}
      />

      <InputManyModal
        sx={{ mt: 3 }}
        name="hobbies"
        label="Увлечения"
        placeholder="Выберите из списка"
        options={hobbies?.data || []}
        disabled={isEdit}
      />

      <InputCheckbox
        sx={{ justifyContent: 'center' }}
        name="isActive"
        link={'/politics.pdf'}
        label={`Я соглашаюсь с политикой обработки персональных данных `}
        disabled={isEdit}
      />
    </Form>
  );
};
