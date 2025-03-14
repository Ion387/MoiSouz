import { type INewProtocol } from '@/models/Protocol';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import s from './forms.module.scss';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { InputDate } from '../ui/form';
import { Icon } from '../ui/Icon';
import { InputTime } from '../ui/form/input-time';
import { TextFieldCustom } from '../ui/form/entities/input-textfield';
import { type INewDoc } from '@/models/Doc';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMembers } from '@/services/members';
import { IFormColleagueProfile } from '@/models/Colleague';
import { getAgendas } from '@/services/agendas';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import { getBackendUrl } from '@/constants/url';

const itemSchema = yup.object().shape({
  person: yup.string().required('Обязательное поле'),
  article: yup.string().required('Обязательное поле'),
  decision: yup.string().required('Обязательное поле'),
  for: yup.number(),
  against: yup.number(),
  abstained: yup.number(),
});

const schema = yup
  .object({
    documentNumber: yup.string(),
    documentDate: yup.string(),
    documentTime: yup.string(),
    place: yup.string().required('Обязательное поле'),
    agenda: yup.string().required('Обязательное поле'),
    members: yup.array().of(yup.string()),
    membersAttending: yup.array().of(yup.string()),
    data: yup.array().of(itemSchema),
  })
  .required();

const NewProtocolFormChild = ({ doc }: { doc?: INewProtocol | null }) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const params = useSearchParams();

  const router = useRouter();

  const {
    register,
    formState: { errors },
    setValue: setFormValue,
    getValues,
  } = methods;

  const [arr, setArr] = useState<IFormColleagueProfile[]>([]);
  const [currentAgenda, setCurrentAgenda] = useState<INewDoc>();
  const { data: members } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
    select: (data) => data.data,
  });

  const { data: agendas } = useQuery({
    queryKey: ['agendas'],
    queryFn: getAgendas,
    select: (data) => data.data,
  });

  useEffect(() => {
    if (members) setArr(members);
  }, [members]);

  useEffect(() => {
    setFormValue('documentNumber', 'PRXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
    setFormValue('documentTime', dayjs().format('hh.mm'));
  }, []);

  useEffect(() => {
    if (doc) {
      setFormValue('documentNumber', doc.documentNumber);
      setFormValue('documentDate', doc.documentDate);
      setFormValue('documentTime', doc.documentTime);
      setFormValue(`place`, doc.place);
      setFormValue(`agenda`, doc.agenda);
      setFormValue(`members`, doc.members);
      setFormValue(`membersAttending`, doc.membersAttending);
      if (doc.data.length) {
        doc.data.forEach((el, id) => {
          setFormValue(`data.${id}.person`, doc.data[id].person);
          setFormValue(`data.${id}.article`, doc.data[id].article);
          setFormValue(`data.${id}.decision`, doc.data[id].decision);
          setFormValue(`data.${id}.for`, doc.data[id].for);
          setFormValue(`data.${id}.against`, doc.data[id].against);
          setFormValue(`data.${id}.abstained`, doc.data[id].abstained);
        });
      }
    }
  }, [doc]);

  useEffect(() => {
    if (currentAgenda) {
      setFormValue(`place`, currentAgenda.data.address);
      if (currentAgenda.data.questions?.length) {
        currentAgenda.data.questions?.forEach((el, id) => {
          setFormValue(
            `data.${id}.person`,
            String(currentAgenda.data.questions?.[id].speaker),
          );
          setFormValue(
            `data.${id}.article`,
            String(currentAgenda.data.questions?.[id].question),
          );
        });
      }
    }
  }, [currentAgenda]);

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async (data: INewProtocol) => {
      const session = await getSession();

      return axios.post(
        `${getBackendUrl}/api/private/document`,
        {
          documentDate: data.documentDate,
          documentNumber: data.documentNumber,
          data: {
            address: data.place,
            members: data.members,
            membersAttending: data.membersAttending,
          },
        },
        {
          headers: { Authorization: `Bearer ${session?.user?.token}` },
        },
      );
    },
  });

  const { mutate: mutateByGuid, isSuccess: isSuccessByGuid } = useMutation({
    mutationFn: async (data: INewProtocol) => {
      const session = await getSession();
      if (doc)
        return axios.post(
          `${getBackendUrl}/api/private/document`,
          {
            documentDate: data.documentDate,
            documentNumber: data.documentNumber,
            guid: doc.guid,
            data: {
              address: data.place,
              members: data.members,
              membersAttending: data.membersAttending,
            },
          },
          {
            headers: { Authorization: `Bearer ${session?.user?.token}` },
          },
        );
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(`/documents/${data?.data.guid}`);
    }
    if (isSuccessByGuid && doc) {
      router.push(`/documents/${doc.guid}`);
    }
  }, [isSuccess, data, doc, isSuccessByGuid]);

  useEffect(() => {
    const param = !!params.entries().toArray().length
      ? params.entries().toArray()[0][1]
      : null;
    console.log('param', param);
    if (param) setCurrentAgenda(agendas?.find((el) => el.guid == param));
  }, [params, agendas]);

  const onSubmit: SubmitHandler<INewProtocol> = async (data) => {
    if (doc && doc.guid) mutateByGuid(data);
    else mutate(data);
  };

  return (
    <Paper className={s.paper} style={{ paddingBottom: '55px' }}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="ru"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <FormProvider {...methods}>
          <form onSubmit={() => {}}>
            <Grid2 container spacing={2}>
              {agendas && (
                <Grid2 size={12}>
                  <InputLabel>Повестка</InputLabel>
                  <Select
                    fullWidth
                    sx={{ padding: 1.6 }}
                    value={currentAgenda?.guid || ''}
                    onChange={(e) => {
                      setCurrentAgenda(
                        agendas?.find((el) => el.guid == e.target.value),
                      );
                      setFormValue('agenda', String(e.target.value));
                    }}
                  >
                    {agendas &&
                      agendas.map((agenda) => (
                        <MenuItem key={agenda.guid} value={agenda.guid}>
                          {agenda.title}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid2>
              )}
              {currentAgenda && (
                <>
                  <Grid2 size={4}>
                    <InputLabel>Номер документа</InputLabel>
                    <TextField
                      {...register('documentNumber')}
                      disabled
                      error={!!errors.documentNumber?.message}
                      helperText={errors.documentNumber?.message || ''}
                    />
                  </Grid2>
                  <Grid2 size={4}>
                    <InputLabel>Дата документа</InputLabel>
                    <InputDate name="documentDate" />
                  </Grid2>
                  <Grid2 size={4}>
                    <InputLabel>Начало заседание</InputLabel>
                    <InputTime name="documentTime" />
                  </Grid2>
                  <Grid2 size={12}>
                    <InputLabel>Место проведения</InputLabel>
                    <TextField
                      {...register('place')}
                      error={!!errors.place?.message}
                      helperText={errors.place?.message || ''}
                    />
                  </Grid2>
                  <Grid2 size={12}>
                    <InputLabel>В состав профкома избраны</InputLabel>
                    <Typography variant="body1">
                      {members &&
                        members.reduce((acc, el, id, arr) => {
                          if (id < arr.length - 1) {
                            return acc + el.name + ', ';
                          } else return acc + el.name;
                        }, '')}
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <InputLabel>Присутствовали на заседании</InputLabel>
                    <Typography component={'div'}>
                      {members &&
                        members.map((el) => (
                          <>
                            <TextField
                              key={el.guid}
                              sx={{
                                position: 'relative',
                                marginBottom: 2.5,
                                '& .MuiOutlinedInput-input.Mui-disabled': {
                                  WebkitTextFillColor: 'rgba(0, 0, 0, 1)',
                                },
                              }}
                              disabled
                              value={el.name}
                            ></TextField>
                            <IconButton
                              sx={{
                                mt: 1.2,
                                position: 'absolute',
                                right: '66px',
                              }}
                              variant={
                                arr?.includes(el)
                                  ? 'contained-red'
                                  : 'contained'
                              }
                              onClick={() => {
                                if (arr?.includes(el)) {
                                  setFormValue(
                                    'membersAttending',
                                    arr
                                      ?.filter((item) => item !== el)
                                      .map((elem) => elem.guid),
                                  );
                                  setArr(
                                    (prev) =>
                                      prev?.filter((item) => item !== el),
                                  );
                                } else {
                                  const array = [];
                                  array?.push(el);
                                  arr?.forEach((elem) => array.push(elem));
                                  setFormValue(
                                    'membersAttending',
                                    array.map((elem) => elem.guid),
                                  );
                                  setArr(array);
                                }
                              }}
                            >
                              <Icon
                                name={arr?.includes(el) ? 'minus' : 'plus'}
                                color="white"
                              />
                            </IconButton>
                          </>
                        ))}
                    </Typography>
                  </Grid2>
                  <Grid2>
                    <Typography variant="body1">
                      В соответствии с п.3 ст. 18 Устава Профсоюза заседание
                      профсоюзного органа считается правомочным (имеет кворум) и
                      объявляется открытым
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    {currentAgenda &&
                      currentAgenda.data.questions?.length &&
                      currentAgenda.data.questions?.map((agenda, id) => (
                        <Box
                          key={agenda.question + id}
                          sx={{
                            p: 2,
                            border: '1px solid rgb(216, 216, 216)',
                            mb: '25px',
                          }}
                        >
                          <Grid2 size={12}>
                            <InputLabel>Слушали:</InputLabel>
                            <TextField
                              {...register(`data.${id}.article`)}
                              multiline
                              rows={3}
                              disabled
                            />
                          </Grid2>
                          <Grid2 size={12} marginTop={2.5}>
                            <InputLabel>Докладывал:</InputLabel>
                            <TextField {...register(`data.${id}.person`)} />
                          </Grid2>
                          <Grid2 size={12} marginTop={2.5}>
                            <InputLabel>Постановили:</InputLabel>
                            <TextField
                              multiline
                              rows={3}
                              {...register(`data.${id}.decision`)}
                            />
                          </Grid2>
                          <Grid2
                            size={12}
                            marginTop={2.5}
                            container
                            spacing={2.5}
                          >
                            <Grid2 size={4}>
                              <InputLabel>За:</InputLabel>
                              <TextFieldCustom
                                sx={{
                                  '& .MuiInputBase-input': {
                                    textAlign: 'center',
                                  },
                                }}
                                register={register(`data.${id}.for`)}
                              />
                            </Grid2>
                            <Grid2 size={4}>
                              <InputLabel>Против:</InputLabel>
                              <TextFieldCustom
                                sx={{
                                  '& .MuiInputBase-input': {
                                    textAlign: 'center',
                                  },
                                }}
                                register={register(`data.${id}.against`)}
                              />
                            </Grid2>
                            <Grid2 size={4}>
                              <InputLabel>Воздержались:</InputLabel>
                              <TextFieldCustom
                                sx={{
                                  '& .MuiInputBase-input': {
                                    textAlign: 'center',
                                  },
                                }}
                                register={register(`data.${id}.abstained`)}
                              />
                            </Grid2>
                          </Grid2>
                        </Box>
                      ))}
                  </Grid2>
                </>
              )}
              <Grid2 size={4}>
                <Button
                  variant="outlined"
                  sx={{ width: '100%', fontSize: '20px', lineHeight: '27px' }}
                  onClick={() => router.push('/main')}
                >
                  Отменить
                </Button>
              </Grid2>
              <Grid2 size={4}>
                <Button
                  variant="outlined"
                  sx={{
                    width: '100%',
                    padding: '16px 25px',
                    fontSize: '20px',
                    lineHeight: '27px',
                  }}
                  onClick={async () => {
                    const values = getValues();
                    await onSubmit(values);
                    router.push('/documents?drafts');
                  }}
                >
                  В черновик
                </Button>
              </Grid2>
              <Grid2 size={4}>
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
      </LocalizationProvider>
    </Paper>
  );
};

const NewProtocolForm = ({ doc }: { doc?: INewProtocol | null }) => {
  return (
    <Suspense>
      <NewProtocolFormChild doc={doc} />
    </Suspense>
  );
};

export default NewProtocolForm;
