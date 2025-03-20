'use client';

import React, { FC, useEffect, useState } from 'react';
import {
  Dialog,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Icon } from '@/components/ui';
import { Form } from '../form';

import { IFeedbackForm } from '@/models/Forms';

const schema = yup
  .object({
    question: yup.string().required('Укажите вопрос'),
    description: yup.string(),
  })
  .required();

interface IDialogProps {
  open: boolean;
  onClose?: () => void;
}

export const HelpDialog: FC<IDialogProps> = ({ open, onClose }) => {
  const [reseted, setReseted] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  const methods = useForm<IFeedbackForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // reset form on open
  useEffect(() => {
    if (open == false) {
      if (reseted == true) setReseted(false);
      return;
    }

    if (open == true && reseted == false) {
      methods.reset();
      setReseted(true);
    }
  }, [methods, open]);

  // send
  const onSubmit = async (data: IFeedbackForm) => {
    // temp
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(data));

    // success
    if (onClose) onClose();
    setSuccess(true);
  };

  return (
    <>
      <Dialog
        sx={{ width: '100%' }}
        open={open}
        onClose={isSubmitting ? undefined : onClose}
        PaperProps={{
          sx: {
            maxWidth: '630px',
            width: '100%',
          },
        }}
      >
        <IconButton
          sx={{ position: 'absolute', right: 10, top: 10 }}
          onClick={isSubmitting ? undefined : onClose}
        >
          <Icon name="close" />
        </IconButton>
        <Form
          loading={isSubmitting}
          buttonCancel={null}
          buttonSubmit="Отправить"
          onSubmit={handleSubmit(onSubmit)}
          methods={methods}
          checkTradeUnionMember={false}
        >
          <Typography variant="h3" marginBottom={2} textAlign={'center'}>
            Поддержка
          </Typography>
          <InputLabel sx={{ mt: 3 }}>Ваш вопрос</InputLabel>
          <TextField
            {...register('question')}
            placeholder="Опишите проблему"
            error={!!errors.question?.message}
            helperText={errors.question?.message || ''}
          />
          <InputLabel sx={{ mt: 3 }}>Комментарий</InputLabel>
          <TextField
            {...register('description')}
            sx={{ mb: 3 }}
            placeholder="Опишите проблему"
            error={!!errors.description?.message}
            helperText={errors.description?.message || ''}
            multiline
            rows={4}
          />
        </Form>
      </Dialog>

      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        PaperProps={{
          sx: {
            p: 4,
            gap: 2,
          },
        }}
      >
        <Typography variant="h3" textAlign={'center'}>
          Ваш вопрос принят.
        </Typography>
        <Typography variant="h3" textAlign={'center'}>
          Спасибо за обращение!
        </Typography>
      </Dialog>
    </>
  );
};
