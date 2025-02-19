import React, { FC, useEffect, useState } from 'react';
import { Dialog, IconButton, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Icon } from '@/components/ui';
import { Form } from '@/components/entities/profile/form';
import { InputAutocomplete } from '@/components/ui/form';

import { IOrganizationUploadUsersForm } from '@/models/Colleagues';
import { IOption } from '@/models/Option';
import FilePickerDialog from '@/components/ui/dialog/FilePickerDialog';

const OPTIONS_ORGANIZATION: IOption[] = [
  { title: 'Организация 1', id: 1 },
  { title: 'Организация 2', id: 2 },
  { title: 'Организация 3', id: 3 },
];

const schema = yup
  .object({
    organization: yup.number().required('Укажите организацию'),
  })
  .required();

interface IDialogProps {
  open: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export const UploadUsersDialog: FC<IDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [reseted, setReseted] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  const [openFilePicker, setOpenFilePicker] = useState<boolean>(false);
  const [filePicked, setFilePicked] = useState<File | null>(null);

  const methods = useForm<IOrganizationUploadUsersForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // reset form on open
  useEffect(() => {
    if (open == false) {
      if (reseted == true) setReseted(false);
      return;
    }

    if (open == true && reseted == false) {
      methods.reset();
      setFilePicked(null);
      setReseted(true);
    }
  }, [methods, open]);

  useEffect(() => {
    if (filePicked == null) return;
    handleSubmit(onSubmit)();
  }, [filePicked]);

  // send
  const onSubmit = async (data: IOrganizationUploadUsersForm) => {
    if (filePicked == null) {
      setOpenFilePicker(false);
      setTimeout(() => setOpenFilePicker(true));
      return;
    }

    // temp (upload !?)
    console.log(data, filePicked);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(data) + '\r\n' + JSON.stringify(filePicked.name));
    setFilePicked(null);

    // success
    if (onClose) onClose();
    setSuccess(true);
    if (onSuccess) onSuccess();
  };

  const handleFilePick = (file: File) => {
    setFilePicked(file);
    setOpenFilePicker(false);
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
          buttonSubmit="Загрузить участников"
          buttonSubmitIcon="upload"
          buttonSubmitSx={{
            marginTop: 6,
            width: 300,
            paddingLeft: 0,
            paddingRight: 0,
          }}
          onSubmit={handleSubmit(onSubmit)}
          methods={methods}
          checkTradeUnionMember={false}
        >
          <Typography
            marginBottom={4}
            marginTop={2}
            textAlign="center"
            fontSize={18}
            fontWeight={600}
          >
            Загрузка участников профсоюза
          </Typography>

          <InputAutocomplete
            name="organization"
            label="Организация"
            placeholder="Выберите организацию"
            options={OPTIONS_ORGANIZATION}
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
          Данные загружены
        </Typography>
      </Dialog>

      <FilePickerDialog
        open={openFilePicker}
        onPick={handleFilePick}
        onClose={() => setOpenFilePicker(false)}
        accept=".xls,.xlsx"
      />
    </>
  );
};
