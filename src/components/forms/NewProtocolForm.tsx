import { type INewProt } from '@/models/Protocol';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  FormHelperText,
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
import { defaultQuestions } from '@/constants/defaultQuestions';
import ProtocolQuestion from '../ui/form/protocolQuestions';

const itemSchema = yup.object().shape({
  speaker: yup.string().required('Обязательное поле'),
  question: yup.string().required('Обязательное поле'),
  decided: yup.string().required('Обязательное поле'),
  approved: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),
  declined: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),
  ignored: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),
  document: yup.string(),
});

const schema = yup
  .object({
    documentNumber: yup.string().required('Обязательное поле'),
    documentDate: yup.string().required('Обязательное поле'),
    documentTime: yup.string().required('Обязательное поле'),
    address: yup.string().required('Обязательное поле'),
    documentAG: yup.string().required('Обязательное поле'),
    userList: yup.array().of(yup.string()),
    questions: yup.array().of(itemSchema).required('Обязательное поле'),
  })
  .required();

const NewProtocolFormChild = ({ doc }: { doc?: INewProt | null }) => {
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
    handleSubmit,
    setError,
  } = methods;

  const [arr, setArr] = useState<IFormColleagueProfile[]>([]);
  const [members, setMembers] = useState<IFormColleagueProfile[]>([]);
  const [isCanView, setIsCanView] = useState<{
    a: number;
    d: number;
    i: number;
  }>({ a: 0, d: 0, i: 0 });
  const [currentAgenda, setCurrentAgenda] = useState<INewDoc>();
  const { data: membersData, isLoading: isMembersLoading } = useQuery({
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
    if (membersData) setMembers(membersData.filter((el) => el.role));
  }, [membersData]);

  useEffect(() => {
    if (members) setArr(members);
  }, [members]);

  useEffect(() => {
    setFormValue('documentNumber', 'PRXXXXX');
    setFormValue('documentDate', dayjs().format('DD.MM.YYYY'));
    setFormValue('documentTime', dayjs().format('HH.mm'));
  }, []);

  useEffect(() => {
    if (doc) {
      setFormValue('documentNumber', doc.documentNumber);
      setFormValue('documentDate', doc.documentDate);
      if (doc.data?.documentTime)
        setFormValue('documentTime', doc.data?.documentTime);
      setFormValue(`address`, doc.address);
      setFormValue(`documentAG`, doc.documentAG);
      setFormValue(`userList`, doc.userList);
      if (doc.questions && doc.questions.length) {
        doc.questions.forEach((el, id) => {
          setFormValue(`questions.${id}.speaker`, doc.questions[id].speaker);
          setFormValue(`questions.${id}.question`, doc.questions[id].question);
          setFormValue(`questions.${id}.decided`, doc.questions[id].decided);
          setFormValue(`questions.${id}.approved`, doc.questions[id].approved);
          setFormValue(`questions.${id}.declined`, doc.questions[id].declined);
          setFormValue(`questions.${id}.ignored`, doc.questions[id].ignored);
          setFormValue(`questions.${id}.document`, doc.questions[id].document);
        });
      }
    }
  }, [doc]);

  useEffect(() => {
    if (doc && doc.data && doc.data.documentAG && agendas)
      setCurrentAgenda(agendas?.find((el) => el.guid == doc.data?.documentAG));
  }, [doc, agendas]);

  useEffect(() => {
    if (arr)
      setFormValue(
        `userList`,
        arr.map((el) => el.name),
      );
  }, [arr]);

  useEffect(() => {
    if (!doc) {
      if (currentAgenda) {
        setFormValue(`address`, currentAgenda.data.address);
        defaultQuestions.forEach((q, id) => {
          setFormValue(`questions.${id}.question`, q.question);
          setFormValue(`questions.${id}.decided`, q.decided);
          setFormValue(`questions.${id}.speaker`, q.speaker);
        });
        if (currentAgenda.data.questions?.length) {
          currentAgenda.data.questions?.forEach((el, id) => {
            setFormValue(`questions.${id + 4}.speaker`, String(el.speaker));
            setFormValue(`questions.${id + 4}.question`, String(el.question));
          });
        }
      }
    }
  }, [currentAgenda, defaultQuestions, doc]);

  const { mutate, isSuccess, data } = useMutation({
    mutationFn: async (data: INewProt) => {
      const session = await getSession();

      return axios.post(
        `${getBackendUrl}/api/private/document`,
        {
          documentNumber: data.documentNumber,
          documentDate: data.documentDate,
          data: {
            documentAG: data.documentAG,
            documentTime: data.documentTime,
            address: data.address,
            userList: data.userList,
            questions: data.questions,
          },
        },
        {
          headers: { Authorization: `Bearer ${session?.user?.token}` },
        },
      );
    },
  });

  const { mutate: mutateByGuid, isSuccess: isSuccessByGuid } = useMutation({
    mutationFn: async (data: INewProt) => {
      const session = await getSession();
      if (doc)
        return axios.post(
          `${getBackendUrl}/api/private/document`,
          {
            documentNumber: data.documentNumber,
            documentDate: data.documentDate,
            guid: doc.guid,
            data: {
              documentAG: data.documentAG,
              documentTime: data.documentTime,
              address: data.address,
              userList: data.userList,
              questions: data.questions,
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
    if (param) setCurrentAgenda(agendas?.find((el) => el.guid == param));
  }, [params, agendas]);

  const onSubmit: SubmitHandler<INewProt> = async (data) => {
    let errorsCount = 0;
    data.questions.forEach((q, id) => {
      const a = q.approved ? q.approved : 0;
      const d = q.declined ? q.declined : 0;
      const i = q.ignored ? q.ignored : 0;
      if (a + d + i != data.userList?.length) {
        setError(`questions.${id}.approved`, {
          message:
            'Число голосов не совпадает с количеством участников заседания',
        });
        setError(`questions.${id}.declined`, {
          message: ' ',
        });
        setError(`questions.${id}.ignored`, {
          message: ' ',
        });
        errorsCount += 1;
      }
    });
    if (doc && doc.guid && errorsCount == 0) mutateByGuid(data);
    else if (errorsCount == 0) mutate(data);
  };

  const onSubmitDraft: SubmitHandler<INewProt> = async (data) => {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              {agendas && (
                <Grid2 size={12}>
                  <InputLabel>Повестка</InputLabel>
                  <Select
                    fullWidth
                    sx={{
                      padding: 1.6,
                      '& .MuiSelect-select span::before': {
                        content: '"Выберите повестку"',
                        opacity: '0.54',
                      },
                    }}
                    value={currentAgenda?.guid || ''}
                    onChange={(e) => {
                      setCurrentAgenda(
                        agendas?.find((el) => el.guid == e.target.value),
                      );
                      setFormValue('documentAG', String(e.target.value));
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
                      {...register('address')}
                      error={!!errors.address?.message}
                      helperText={errors.address?.message || ''}
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
                          <Box key={el.guid}>
                            <TextField
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
                                    'userList',
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
                                    'userList',
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
                          </Box>
                        ))}
                    </Typography>
                  </Grid2>
                  <Grid2 size={12}>
                    <Box
                      sx={{
                        p: 2,
                        border: '1px solid rgb(216, 216, 216)',
                        mb: '25px',
                      }}
                    >
                      <Grid2 size={12}>
                        <InputLabel>Слушали:</InputLabel>
                        <TextField
                          {...register(`questions.${0}.question`)}
                          multiline
                          rows={3}
                          disabled
                        />
                      </Grid2>
                      <Grid2 size={12} marginTop={2.5} position={'relative'}>
                        <InputLabel>Докладывал:</InputLabel>
                        {!isMembersLoading && arr && (
                          <>
                            <Select
                              fullWidth
                              sx={{ padding: 1.6 }}
                              name={`questions.${0}.speaker`}
                              value={getValues(`questions.${0}.speaker`)}
                              onChange={(e) => {
                                setFormValue(
                                  `questions.${0}.speaker`,
                                  String(e.target.value),
                                );
                              }}
                              error={!!errors?.questions?.[0]?.speaker?.message}
                            >
                              {arr &&
                                arr.map((member) => (
                                  <MenuItem
                                    key={member.guid}
                                    value={member.name}
                                  >
                                    {member.role + ' - ' + member.name}
                                  </MenuItem>
                                ))}
                            </Select>
                            {!!errors?.questions?.[0]?.speaker?.message && (
                              <FormHelperText
                                sx={{
                                  color: '#FF4949',
                                  position: 'absolute',
                                }}
                              >
                                {errors?.questions?.[0]?.speaker?.message}
                              </FormHelperText>
                            )}
                          </>
                        )}
                      </Grid2>
                      <Grid2 size={12} marginTop={2.5}>
                        <InputLabel>Постановили:</InputLabel>
                        <TextField
                          multiline
                          rows={3}
                          {...register(`questions.${0}.decided`)}
                          disabled
                        />
                      </Grid2>
                      <Grid2 size={12} marginTop={2.5} container spacing={2.5}>
                        <Grid2 size={4}>
                          <InputLabel>За:</InputLabel>
                          <TextFieldCustom
                            sx={{
                              '& .MuiInputBase-input': {
                                textAlign: 'center',
                              },
                            }}
                            register={register(`questions.${0}.approved`)}
                            error={
                              errors.questions
                                ? errors?.questions[0]?.approved?.message
                                : undefined
                            }
                            onChange={(
                              e: React.ChangeEvent<
                                HTMLTextAreaElement | HTMLInputElement
                              >,
                            ) => {
                              setFormValue(
                                `questions.${0}.approved`,
                                e.target.value == ''
                                  ? null
                                  : Number(e.target.value),
                              );
                              setIsCanView((prev) => ({
                                ...prev,
                                a: Number(e.target.value),
                              }));
                            }}
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
                            register={register(`questions.${0}.declined`)}
                            error={
                              errors.questions
                                ? errors?.questions[0]?.declined?.message
                                : undefined
                            }
                            onChange={(
                              e: React.ChangeEvent<
                                HTMLTextAreaElement | HTMLInputElement
                              >,
                            ) => {
                              setFormValue(
                                `questions.${0}.declined`,
                                e.target.value == ''
                                  ? null
                                  : Number(e.target.value),
                              );
                              setIsCanView((prev) => ({
                                ...prev,
                                d: Number(e.target.value),
                              }));
                            }}
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
                            register={register(`questions.${0}.ignored`)}
                            error={
                              errors.questions
                                ? errors?.questions[0]?.ignored?.message
                                : undefined
                            }
                            onChange={(
                              e: React.ChangeEvent<
                                HTMLTextAreaElement | HTMLInputElement
                              >,
                            ) => {
                              setFormValue(
                                `questions.${0}.ignored`,
                                e.target.value == ''
                                  ? null
                                  : Number(e.target.value),
                              );
                              setIsCanView((prev) => ({
                                ...prev,
                                i: Number(e.target.value),
                              }));
                            }}
                          />
                        </Grid2>
                      </Grid2>
                    </Box>
                  </Grid2>
                  <Grid2 size={12}>
                    {arr.length > 2 &&
                    isCanView.a >= isCanView.d + isCanView.i &&
                    isCanView.a + isCanView.d + isCanView.i == arr.length &&
                    currentAgenda &&
                    currentAgenda.data.questions?.length ? (
                      [
                        ...defaultQuestions.slice(1),
                        ...currentAgenda?.data.questions,
                      ].map((agenda, id, array) => (
                        <ProtocolQuestion
                          key={agenda.question + id + 1}
                          id={id}
                          array={array}
                          arr={arr}
                          setFormValue={setFormValue}
                          errors={errors}
                          isMembersLoading={isMembersLoading}
                          register={register}
                          type={
                            id < 3
                              ? 'assessors'
                              : agenda.document
                                ? 'members'
                                : undefined
                          }
                        />
                      ))
                    ) : arr.length < 3 ? (
                      <Box>
                        <Typography
                          color={'#FF4949'}
                          textAlign={'center'}
                          fontWeight={600}
                        >
                          Количество участников заседание должно быть больше 2
                        </Typography>
                      </Box>
                    ) : isCanView.a + isCanView.d + isCanView.i !=
                      arr.length ? (
                      <Box>
                        <Typography
                          color={'#FF4949'}
                          textAlign={'center'}
                          fontWeight={600}
                        >
                          Число голосов не совпадает с количеством участников
                          заседания
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Typography
                          color={'#FF4949'}
                          textAlign={'center'}
                          fontWeight={600}
                        >
                          Необходимо утвердить повестку заседания
                        </Typography>
                      </Box>
                    )}
                  </Grid2>
                </>
              )}
              <Grid2 size={arr.length > 2 ? 4 : 12}>
                <Button
                  variant="outlined"
                  sx={{ width: '100%', fontSize: '20px', lineHeight: '27px' }}
                  onClick={() => router.push('/documents?incoming')}
                >
                  Отменить
                </Button>
              </Grid2>
              {arr.length > 2 && (
                <>
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
                        if (values.userList?.includes(undefined))
                          delete values.userList;
                        await onSubmitDraft(values);
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
                </>
              )}
            </Grid2>
          </form>
        </FormProvider>
      </LocalizationProvider>
    </Paper>
  );
};

const NewProtocolForm = ({ doc }: { doc?: INewProt | null }) => {
  return (
    <Suspense>
      <NewProtocolFormChild doc={doc} />
    </Suspense>
  );
};

export default NewProtocolForm;
