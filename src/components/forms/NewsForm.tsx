'use client';

import { FC } from 'react';
import { Box, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form } from '@/components/entities/profile';
import {
  InputAutocomplete,
  InputDate,
  InputImage,
  InputHTML,
} from '@/components/ui/form';

import { IFormNews } from '@/models/News';
import { OPTIONS_NEWS_STATUS } from '@/constants/options';
import { convertSizeToBites } from '@/utils/convertStringToB';

const schema = yup
  .object({
    title: yup.string().required('Введите заголовок'),
    preview: yup.string().required('Введите превью'),
    text: yup.string().required('Настройте контент'),
    image: yup
      .mixed()
      .required('Укажите изображение')
      .test('fileSize', 'Максимальный размер - 2 МБ.', (value) => {
        if (!value || typeof value === 'string') return true;
        //@ts-expect-error none
        return convertSizeToBites(value.size) <= 2 * 1048576;
      }),
    date: yup.string().required('Укажите дату').typeError('Укажите дату'),
    status: yup.string().required('Укажите статус'),
  })
  .required();

interface Props {
  onCancel: () => void;
  onSubmit: (data: IFormNews) => Promise<void>;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: IFormNews | any;
  errorsExtra?: { [key: string]: string } | null;
}

export const NewsForm: FC<Props> = ({
  onCancel,
  onSubmit,
  loading,
  defaultValues,
  errorsExtra,
}) => {
  const methods = useForm<IFormNews>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <Form
      sx={{ pt: 3 }}
      title="Добавление новости"
      loading={loading || isSubmitting}
      onCancel={onCancel}
      buttonSubmit={defaultValues ? undefined : 'Добавить'}
      onSubmit={handleSubmit(onSubmit)}
      methods={methods}
      defaultValues={defaultValues}
      errorsExtra={errorsExtra}
      checkTradeUnionMember={false}
    >
      <InputImage
        sx={{ minWidth: '100%', height: '400px' }}
        name="image"
        label="Изображение"
      />

      <InputLabel sx={{ mt: 3 }}>Заголовок</InputLabel>
      <TextField
        {...register('title')}
        placeholder="Заголовок"
        error={!!errors.title?.message}
        helperText={errors.title?.message || ''}
      />

      <InputLabel sx={{ mt: 3 }}>Превью</InputLabel>
      <TextField
        {...register('preview')}
        placeholder="Превью"
        error={!!errors.preview?.message}
        helperText={errors.preview?.message || ''}
      />

      <InputHTML sx={{ mt: 3 }} name="text" label="Контент" />

      <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 3 }}>
        <InputDate
          sx={{ width: '30%' }}
          name="date"
          label="Дата"
          isFutureAccess
        />
        <InputAutocomplete
          sx={{ width: '70%' }}
          name="status"
          label="Статус"
          placeholder="Выберите из списка"
          options={OPTIONS_NEWS_STATUS}
        />
      </Box>
    </Form>
  );
};
