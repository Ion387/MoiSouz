import { IDoc } from '@/models/Doc';
import { groupByTU } from '@/utils/groupByTradeUnion';
import { Box, Divider, Grid2, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';

interface ITableProps {
  docs: IDoc[] | undefined;
}

const Table: FC<ITableProps> = ({ docs }) => {
  const groupedDocs = docs ? groupByTU(docs) : [];

  return (
    <Paper sx={{ p: 0, pb: 1.6 }}>
      <Grid2 container sx={{ p: 1.6 }}>
        <Grid2 size={3}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Организация
          </Typography>
        </Grid2>
        <Grid2 size={3}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Документ
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Номер
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Дата
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Статус
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Связь
          </Typography>
        </Grid2>
      </Grid2>
      <Divider></Divider>
      {groupedDocs.map((el, index, arr) => (
        <Box key={el.tradeunion + index}>
          <Grid2 container sx={{ p: 1.6 }}>
            <Grid2 size={3}>
              <Typography variant="body2" fontWeight={600}>
                {el.tradeunion}
              </Typography>
            </Grid2>
            <Grid2 size={9}>
              {el.docs.map((doc, id, array) => (
                <Box key={doc.documentNumber}>
                  <Grid2 container sx={{ py: 2.4 }}>
                    <Grid2 size={4}>
                      <Typography variant="body2" fontWeight={600}>
                        {doc.documentType === 'AM'
                          ? 'Заявление на вступление'
                          : doc.documentType}
                      </Typography>
                    </Grid2>
                    <Grid2 size={2}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        textAlign={'center'}
                      >
                        {doc.documentNumber}
                      </Typography>
                    </Grid2>
                    <Grid2 size={2}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        textAlign={'center'}
                      >
                        {doc.documentDate}
                      </Typography>
                    </Grid2>
                    <Grid2 size={2}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        textAlign={'center'}
                      >
                        {doc.status}
                      </Typography>
                    </Grid2>
                    <Grid2 size={2} justifyContent={'center'} display={'flex'}>
                      <Link href={`/documents/${doc.documentNumber}`}>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          textAlign={'center'}
                          sx={{ textDecoration: 'underline !important' }}
                        >
                          {doc.documentNumber}
                        </Typography>
                      </Link>
                    </Grid2>
                  </Grid2>
                  {id !== array.length - 1 && <Divider></Divider>}
                </Box>
              ))}
            </Grid2>
          </Grid2>
          {index !== arr.length - 1 && <Divider></Divider>}
        </Box>
      ))}
    </Paper>
  );
};

export default Table;
