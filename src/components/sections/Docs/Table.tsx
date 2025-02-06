import { IDoc } from '@/models/Doc';
import { groupByTU } from '@/utils/groupByTradeUnion';
import { Box, Divider, Grid2, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';
import s from './table.module.scss';

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
        <Grid2 size={2}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Номер
          </Typography>
        </Grid2>
        <Grid2 size={2}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Дата
          </Typography>
        </Grid2>
        <Grid2 size={2}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Статус
          </Typography>
        </Grid2>
      </Grid2>
      <Divider></Divider>
      {groupedDocs && !!groupedDocs.length ? (
        groupedDocs.map((el, index, arr) => (
          <Box key={el.tradeunion + index}>
            <Grid2 container sx={{ p: 1.6 }}>
              <Grid2 size={3}>
                <Typography variant="body2" fontWeight={600} pt={2.4}>
                  {el.tradeunion}
                </Typography>
              </Grid2>
              <Grid2 size={9}>
                {el &&
                  el.docs &&
                  el.docs.map((doc, id, array) => (
                    <Box key={doc.guid} className={s.hover}>
                      <Link
                        href={
                          doc.folder === 'drafts'
                            ? `/documents/drafts/${doc.guid}`
                            : `/documents/${doc.guid}`
                        }
                        style={{ width: '100%' }}
                      >
                        <Grid2 container sx={{ py: 2.4 }}>
                          <Grid2 size={4}>
                            <Typography variant="body2" fontWeight={600}>
                              {doc.documentType === 'AM'
                                ? 'Заявление на вступление'
                                : doc.documentType}
                            </Typography>
                          </Grid2>
                          <Grid2 size={2.666}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              textAlign={'center'}
                            >
                              {doc.documentNumber}
                            </Typography>
                          </Grid2>
                          <Grid2 size={2.666}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              textAlign={'center'}
                            >
                              {doc.documentDate}
                            </Typography>
                          </Grid2>
                          <Grid2 size={2.666}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              textAlign={'center'}
                            >
                              {doc.step}
                            </Typography>
                          </Grid2>
                        </Grid2>
                      </Link>
                      {id !== array.length - 1 && <Divider></Divider>}
                    </Box>
                  ))}
              </Grid2>
            </Grid2>
            {index !== arr.length - 1 && <Divider></Divider>}
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1.2,
          }}
        >
          <Typography variant="h3">Здесь пока пусто</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Table;
