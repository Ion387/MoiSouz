import {
  Box,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { FC } from 'react';
import { TextFieldCustom } from './entities';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IFormColleagueProfile } from '@/models/Colleague';
import { defaultOptions, defaultQuestions } from '@/constants/defaultQuestions';

interface IProtocolQuestionsProps {
  id: number;
  array: {
    speaker: string;
    question: string;
    document?: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  isMembersLoading: boolean;
  arr: IFormColleagueProfile[];
  setFormValue: UseFormSetValue<{
    userList?: (string | undefined)[] | undefined;
    address: string;
    questions: {
      document?: string | undefined;
      approved?: number | null | undefined;
      declined?: number | null | undefined;
      ignored?: number | null | undefined;
      speaker: string;
      question: string;
      decided: string;
    }[];
    documentNumber: string;
    documentDate: string;
    documentTime: string;
    documentAG: string;
  }>;
  errors: FieldErrors<{
    userList?: (string | undefined)[] | undefined;
    address: string;
    questions: {
      document?: string | undefined;
      approved?: number | null | undefined;
      declined?: number | null | undefined;
      ignored?: number | null | undefined;
      speaker: string;
      question: string;
      decided: string;
    }[];
    documentNumber: string;
    documentDate: string;
    documentTime: string;
    documentAG: string;
  }>;
  key: string;
  type?: 'assessors' | 'members';
}

const ProtocolQuestion: FC<IProtocolQuestionsProps> = ({
  id,
  array,
  register,
  isMembersLoading,
  arr,
  setFormValue,
  errors,
  key,
  type,
}) => {
  return (
    <Box
      key={key}
      sx={{
        p: 2,
        border: '1px solid rgb(216, 216, 216)',
        mb: '25px',
      }}
    >
      <Grid2 size={12}>
        <InputLabel>Слушали:</InputLabel>
        <TextField
          {...register(`questions.${id + 1}.question`)}
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
              name={`questions.${id + 1}.speaker`}
              defaultValue={array[id].speaker}
              onChange={(e) => {
                setFormValue(
                  `questions.${id + 1}.speaker`,
                  String(e.target.value),
                );
              }}
              error={!!errors?.questions?.[id + 1]?.speaker?.message}
            >
              {arr &&
                arr.map((member) => (
                  <MenuItem key={member.guid} value={member.name}>
                    {member.role + ' - ' + member.name}
                  </MenuItem>
                ))}
            </Select>
            {!!errors?.questions?.[id + 1]?.speaker?.message && (
              <FormHelperText
                sx={{
                  color: '#FF4949',
                  position: 'absolute',
                }}
              >
                {errors?.questions?.[id + 1]?.speaker?.message}
              </FormHelperText>
            )}
          </>
        )}
      </Grid2>
      <Grid2 size={12} marginTop={2.5}>
        <InputLabel>Постановили:</InputLabel>
        {!type ? (
          <TextField
            multiline
            rows={3}
            {...register(`questions.${id + 1}.decided`)}
          />
        ) : type === 'assessors' ? (
          <Select
            fullWidth
            sx={{ padding: 1.6 }}
            name={`questions.${id + 1}.decided`}
            onChange={(e) => {
              setFormValue(
                `questions.${id + 1}.decided`,
                String(e.target.value),
              );
            }}
            error={!!errors?.questions?.[id + 1]?.decided?.message}
          >
            {arr &&
              arr.map((member) => (
                <MenuItem
                  key={member.guid}
                  value={defaultQuestions[id + 1].decided + '- ' + member.name}
                >
                  {defaultQuestions[id + 1].decided + '- ' + member.name}
                </MenuItem>
              ))}
          </Select>
        ) : (
          <Select
            fullWidth
            sx={{ padding: 1.6 }}
            name={`questions.${id + 1}.decided`}
            onChange={(e) => {
              setFormValue(
                `questions.${id + 1}.decided`,
                String(e.target.value),
              );
            }}
            error={!!errors?.questions?.[id + 1]?.decided?.message}
          >
            {defaultOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
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
            register={register(`questions.${id + 1}.approved`)}
            error={
              errors.questions
                ? errors?.questions[id + 1]?.approved?.message
                : undefined
            }
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
            register={register(`questions.${id + 1}.declined`)}
            error={
              errors.questions
                ? errors?.questions[id + 1]?.declined?.message
                : undefined
            }
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
            register={register(`questions.${id + 1}.ignored`)}
            error={
              errors.questions
                ? errors?.questions[id + 1]?.ignored?.message
                : undefined
            }
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProtocolQuestion;
