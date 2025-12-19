'use client';

import { ListItem } from '@/components/ui';
import { postDoc } from '@/services/postLogoandFile';

import { Box, Button, Grid2, Paper } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { globalTheme } from '@/styles/theme';
import { getDoc } from '@/services/getDocs';
import { useFetchProfile } from '@/hooks/useFetchProfile';

import { getBackendUrl } from '@/constants/url';
import axios from 'axios';
import { getHeaders } from '@/utils/axios';
import { type IDocAppeal } from '@/models/Doc';
import { getParentNode, useFetchTree } from '@/hooks/UseTree';
import { useRouter } from 'next/navigation';

const ScanAppealBlock = ({
  number,
  onOpenDialog,
}: {
  number: string;
  onOpenDialog: (type: 'decline' | 'success') => void;
}) => {
  const { info } = useFetchProfile();
  const queryClient = useQueryClient();
  const [parent, setParent] = useState<number | null>(null);
  const { data } = useFetchTree({ type: 'arr', perPage: 1000 });
  const router = useRouter();
  const { data: file } = useQuery({
    queryKey: ['doc', number],
    queryFn: () => getDoc(number),
    select: (data) => data,
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      doc,
      answer,
      id,
    }: {
      doc: IDocAppeal;
      answer?: string;
      id?: number | null;
    }) => {
      const data = {
        data: { ...doc.data },
        documentDate: doc.documentDate,
        documentNumber: doc.documentNumber,
        tradeunion: id ? id : doc.tradeunion.id,
        id: doc.id,
      };
      data.data.answer = answer;
      return axios.post(
        `${getBackendUrl}/api/private/document`,
        { ...data, data: { ...data.data }, guid: number },
        {
          headers: {
            ...(await getHeaders()),
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doc'] });
      queryClient.refetchQueries({ queryKey: ['docs'] });
    },
  });

  const { mutate: mutate2 } = useMutation({
    mutationFn: async (data: { step: string }) => {
      await postDoc(data, number);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doc'] });
      queryClient.refetchQueries({ queryKey: ['docs'] });
    },
  });

  useEffect(() => {
    if (data.data && file) {
      const parentNode = getParentNode(data.data, Number(file.tradeunion?.id));
      setParent(parentNode?.id || null);
    }
  }, [data, file]);

  return (
    <>
      {file?.step !== 'Отклонено' && file?.step !== 'Обращение решено' && (
        <Paper>
          {!info?.ROLES?.includes('ROLE_TRADEUNION') && (
            <Box>
              <ListItem
                label="Редактировать"
                to={`/documents/drafts/${number}`}
                icon="edit"
              />
            </Box>
          )}

          <Box style={{ height: 'calc(100% - 208px)' }}>
            <Grid2 container position={'relative'} height={'100%'}>
              {info?.ROLES?.includes('ROLE_TRADEUNION') && (
                <Grid2
                  size={12}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'end'}
                >
                  <Grid2 size={12}>
                    <Button
                      variant="outlined"
                      sx={{
                        padding: '15px 15px',
                        fontSize: '20px',
                        lineHeight: '27px',
                        width: '100%',

                        '&.Mui-disabled': {
                          backgroundColor: `${globalTheme.palette.primary.main} !important`,
                          color: 'white !important',
                        },
                      }}
                      type={'button'}
                      onClick={() => {
                        if (file?.step === 'В работе') {
                          mutate({ doc: file as IDocAppeal, id: parent });
                          router.push('/documents?incoming');
                        } else onOpenDialog('decline');
                      }}
                    >
                      {file?.step === 'В работе'
                        ? 'Перенаправить вышестоящей организации'
                        : 'Отклонить'}
                    </Button>
                  </Grid2>

                  {info?.ROLES?.includes('ROLE_TRADEUNION') && (
                    <Grid2 size={12}>
                      <Button
                        variant="contained"
                        sx={{
                          padding: '15px 15px',
                          fontSize: '20px',
                          lineHeight: '27px',
                          width: '100%',
                          marginTop: '24px',
                          '&.Mui-disabled': {
                            backgroundColor: `${globalTheme.palette.primary.main} !important`,
                            color: 'white !important',
                          },
                        }}
                        onClick={() => {
                          if (
                            file?.step === 'Отправлено в профсоюз' ||
                            file?.step === 'Утверждено' ||
                            file?.step === 'Ожидает отправки'
                          )
                            mutate2({ step: 'В работе' });
                          else onOpenDialog('success');
                        }}
                      >
                        {file?.step === 'В работе'
                          ? 'Направить ответ по обращению'
                          : 'Взять в работу'}
                      </Button>
                    </Grid2>
                  )}
                </Grid2>
              )}
            </Grid2>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ScanAppealBlock;
