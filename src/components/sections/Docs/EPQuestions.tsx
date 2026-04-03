import { type IQuestion } from '@/models/Protocol';
import theme from '@/styles/theme';
import { Box, Grid2, Typography } from '@mui/material';
import React, { FC } from 'react';
import { FieldErrors } from 'react-hook-form';

interface IQuestionsProps {
  question: null | IQuestion;
  questions: undefined | IQuestion[];
  setQuestion: React.Dispatch<React.SetStateAction<IQuestion | null>>;
  errors?: FieldErrors<{
    documentDate?: string | undefined;
    documentNumber?: string | undefined;
    id?: number | null | undefined;
    data: {
      parent?: string | null | undefined;
      parentGuid: string;
      question: string;
      resolution: string;
    };
    tradeunion: number;
  }>;
}

const EPQuestions: FC<IQuestionsProps> = ({
  questions,
  question,
  setQuestion,
  errors,
}) => {
  console.log('errors', errors);
  return (
    <Grid2 container spacing={1.2}>
      <Grid2 size={12}>
        <Typography variant="h3" sx={{ fontSize: '18px' }}>
          Выберите вопрос
        </Typography>
      </Grid2>
      {questions &&
        questions.map((el) => (
          <Grid2 key={el.question} size={12}>
            <Box
              onClick={() => setQuestion(el)}
              sx={{
                cursor: 'pointer',
                padding: '16px',
                borderRadius: '12px',
                '&:hover': { background: '#4880ff0d' },
                background:
                  question?.question === el.question
                    ? '#4880ff0d'
                    : 'transparent',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Вопрос:
              </Typography>
              <Typography variant="body1">{el.question}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Постановили:
              </Typography>
              <Typography variant="body1">{el.decided}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Докладчик:
              </Typography>
              <Typography variant="body1">{el.speaker}</Typography>
            </Box>
          </Grid2>
        ))}
      {errors?.data?.question?.message && (
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.red.main,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {errors?.data?.question?.message}
        </Typography>
      )}
    </Grid2>
  );
};

export default EPQuestions;
