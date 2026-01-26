import { type IQuestion } from '@/models/Protocol';
import { Box, Grid2, Typography } from '@mui/material';
import React, { FC } from 'react';

interface IQuestionsProps {
  question: null | IQuestion;
  questions: undefined | IQuestion[];
  setQuestion: React.Dispatch<React.SetStateAction<IQuestion | null>>;
}

const EPQuestions: FC<IQuestionsProps> = ({
  questions,
  question,
  setQuestion,
}) => {
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
    </Grid2>
  );
};

export default EPQuestions;
