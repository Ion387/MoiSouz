'use client';

import { type IEPDoc } from '@/models/EPDoc';
import { type IQuestion, type INewProt } from '@/models/Protocol';
import { Box, Grid2, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const EPForm = ({
  doc,
  protocol,
}: {
  doc?: IEPDoc | null;
  protocol?: INewProt | null;
}) => {
  const [question, setQuestion] = useState<null | IQuestion>(null);
  const [questions, setQuestions] = useState<undefined | IQuestion[]>(
    protocol?.data?.questions?.filter((el, index) => index > 3),
  );

  useEffect(() => {
    if (protocol)
      setQuestions(protocol?.data?.questions?.filter((el, index) => index > 3));
  }, [protocol]);

  useEffect(() => {
    if (questions?.length === 1) setQuestion(questions[0]);
  }, [questions]);
  console.log('doc', doc);
  console.log('questions', questions);

  if (!question)
    return (
      <Paper>
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
      </Paper>
    );
  return <div>EPForm</div>;
};

export default EPForm;
