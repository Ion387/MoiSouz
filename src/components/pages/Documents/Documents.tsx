'use client';

import NewProfileDialog from '@/components/entities/profile/newProfileDialog';
import Table from '@/components/sections/Docs/Table';
import { Icon } from '@/components/ui';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { IDoc } from '@/models/Doc';
import { getDocs } from '@/services/getDocs';
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { globalTheme } from '@/styles/theme';
import { TradeunionCheckDialog } from '@/components/entities/profile/dialogs/tradeunion-check-dialog';

const DocumentsWrapper = () => {
  const { data: docs, isLoading } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });
  const params = useSearchParams();
  const param = !!params.entries().toArray().length
    ? params.entries().toArray()[0][0]
    : null;

  const filtredDocs =
    Array.isArray(docs) && param
      ? docs.filter((el: IDoc) => el.folder === param)
      : Array.isArray(docs)
        ? docs
        : [];

  const info = useFetchProfile();
  const [open, setOpen] = useState(
    !!info?.ROLES?.includes('ROLE_TRADEUNION') && !info?.hasTradeunionOwner,
  );
  const [newDocOpen, setNewDocOpen] = useState<boolean>(false);
  const path = usePathname();

  useEffect(
    () =>
      setOpen(
        !!info?.ROLES?.includes('ROLE_TRADEUNION') && !info?.hasTradeunionOwner,
      ),
    [info],
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Typography variant="h3" marginBottom={2}>
          Документы
        </Typography>
        {
          <Button
            variant="contained"
            onClick={() => setNewDocOpen(true)}
            sx={{ marginBottom: '12px' }}
          >
            <Icon
              name={'newDoc'}
              color="#ffffff"
              sx={{ marginRight: '6px' }}
            ></Icon>
            Создать документ
          </Button>
        }
      </Box>
      <Table docs={filtredDocs} />
      <TradeunionCheckDialog
        open={
          !info?.ROLES?.includes('ROLE_TRADEUNION') &&
          !info?.hasTradeunionMember &&
          !isLoading
        }
      />
      <NewProfileDialog
        open={open}
        btn="Заполнить"
        link="/profile"
        title="Для того, чтобы воспользоваться всеми функциями системы, заполните анкету организации, выберите и оплатите тариф"
        onClose={path.includes('profile') ? () => setOpen(false) : () => {}}
      />
      <Dialog open={newDocOpen} onClose={() => setNewDocOpen(false)}>
        <Box
          sx={{
            p: 2.4,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: '0 auto',
          }}
        >
          <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
            <Typography variant="h3" textAlign={'center'} marginBottom={2}>
              Выберите тип документа
            </Typography>
            <IconButton
              sx={{ position: 'absolute', top: '-16px', right: '-16px' }}
              onClick={() => setNewDocOpen(false)}
            >
              <Icon name="close"></Icon>
            </IconButton>
          </Box>
          {info?.ROLES?.includes('ROLE_TRADEUNION') ? (
            <>
              <Link href={'/new_document'} style={{ width: '100%' }}>
                <Button
                  variant="contained"
                  sx={{
                    padding: '15px 100px',
                    fontSize: '20px',
                    lineHeight: '27px',
                    marginBottom: '20px',
                    width: '100%',
                    '&.Mui-disabled': {
                      backgroundColor: `${globalTheme.palette.primary.main} !important`,
                      color: 'white !important',
                    },
                  }}
                >
                  Повестка
                </Button>
              </Link>
              <Link href={'/new_protocol'} style={{ width: '100%' }}>
                <Button
                  variant="contained"
                  sx={{
                    padding: '15px 100px',
                    fontSize: '20px',
                    lineHeight: '27px',
                    width: '100%',
                    '&.Mui-disabled': {
                      backgroundColor: `${globalTheme.palette.primary.main} !important`,
                      color: 'white !important',
                    },
                  }}
                >
                  Протокол
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={'/trade_union_member'} style={{ width: '100%' }}>
                <Button
                  variant="contained"
                  sx={{
                    padding: '15px 100px',
                    fontSize: '20px',
                    lineHeight: '27px',
                    marginBottom: '20px',
                    width: '100%',
                    '&.Mui-disabled': {
                      backgroundColor: `${globalTheme.palette.primary.main} !important`,
                      color: 'white !important',
                    },
                  }}
                >
                  Заявление на вступление в профсоюз
                </Button>
              </Link>
              <Button
                variant="contained"
                disabled
                sx={{
                  padding: '15px 100px',
                  fontSize: '20px',
                  lineHeight: '27px',
                  width: '100%',
                  '&.Mui-disabled': {
                    backgroundColor: `${globalTheme.palette.primary.light} !important`,
                    color: 'white !important',
                  },
                }}
              >
                Обращение в профсоюз
              </Button>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

const DocumentsPage = () => {
  return (
    <Suspense>
      <DocumentsWrapper />
    </Suspense>
  );
};

export default DocumentsPage;
