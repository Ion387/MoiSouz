import { type IQuestion } from '@/models/Protocol';
import { Box, Grid2, Typography } from '@mui/material';
import React, { FC } from 'react';

interface IQuestionsProps {
  questions: undefined | IQuestion[];
}

const RuQuestions: FC<IQuestionsProps> = ({ questions }) => {
  return (
    <Grid2 container spacing={1.2}>
      {questions &&
        questions.map((el) => (
          <Grid2 key={el.question} size={12}>
            <Box
              sx={{
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid black',
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

export default RuQuestions;
