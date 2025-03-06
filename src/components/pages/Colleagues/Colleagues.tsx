'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { Icon } from '@/components/ui';
import {
  TradeUnionCard,
  Table,
  UploadUsersDialog,
} from '@/components/sections/Colleagues';

import { useFetchProfile } from '@/hooks/useFetchProfile';

import { useFetchTUOwner, useFetchTUUsers } from '@/hooks/useTU';
import { ITradeUnion } from '@/models/TradeUnion';

const KEY_PARAM_ORGANIZATION = 'organization';

const ColleaguesWrapper = () => {
  const params = useSearchParams();
  const router = useRouter();

  const info = useFetchProfile();
  //const tuList = useFetchTUs();
  const tuOwner = useFetchTUOwner();
  const {
    data: tuUsers,
    loading: loadingTUUsers,
    refetch: refetchTUUsers,
  } = useFetchTUUsers();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const tuList: { data: ITradeUnion[] } | null = useMemo(
    () => (tuOwner && tuUsers ? { data: [tuOwner] } : null),
    [tuOwner, tuUsers],
  );

  const tuActive: ITradeUnion | null = useMemo(
    () =>
      tuList?.data.find(
        (el) => el.id == (params?.get(KEY_PARAM_ORGANIZATION) ?? -1),
      ) ?? null,
    [tuList, params],
  );

  useEffect(() => {
    if (tuActive != null) return;
    if (tuList == null) return;
    if (tuList.data.length == 0) return;
    handleClickTradeunion(tuList.data[0]);
  }, [tuList]);

  const handleClickTradeunion = (data: ITradeUnion) => {
    // unselect !?
    if (data.id == tuActive?.id) {
      router.push(`${window.location.pathname}`);
      refetchTUUsers();
      return;
    }

    router.push(
      `${window.location.pathname}?${KEY_PARAM_ORGANIZATION}=${data.id}`,
    );
    refetchTUUsers();
  };

  const handleClickUpload = () => {
    setOpenDialog(true);
  };

  const handleSuccessUpload = () => {
    refetchTUUsers();
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={1.5} marginTop={3}>
        <Typography variant="h3" marginBottom={2}>
          Коллеги
        </Typography>

        {tuList ? (
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Box display="flex" flexWrap="wrap" gap={1.5}>
              {tuList?.data.map((el) => (
                <TradeUnionCard
                  key={el.id}
                  data={el}
                  count={tuUsers?.length}
                  onClick={handleClickTradeunion}
                  active={tuActive?.id == el.id}
                />
              ))}
            </Box>

            {tuActive && info?.hasTradeunionOwner && (
              <Button
                variant="contained"
                sx={{
                  gap: 1,
                  height: 'fit-content',
                  minWidth: 'fit-content',
                  marginTop: 'auto',
                }}
                onClick={handleClickUpload}
              >
                <Icon name="upload" color="secondary.main" />
                Загрузить участников
              </Button>
            )}
          </Box>
        ) : (
          <Box display={'flex'} justifyContent={'center'} width={'100%'}>
            <CircularProgress />
          </Box>
        )}

        {!loadingTUUsers && tuUsers ? (
          <Table
            users={(tuActive && tuUsers) || []}
            tradeunion={tuActive}
            owner={info?.hasTradeunionOwner}
          />
        ) : (
          <Box display={'flex'} justifyContent={'center'} width={'100%'}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      {info?.hasTradeunionOwner && (
        <UploadUsersDialog
          open={openDialog}
          defaultTradeUnion={tuActive}
          onClose={() => setOpenDialog(false)}
          onSuccess={handleSuccessUpload}
        />
      )}
    </>
  );
};

const ColleaguesPage = () => {
  return (
    <Suspense>
      <ColleaguesWrapper />
    </Suspense>
  );
};

export default ColleaguesPage;
