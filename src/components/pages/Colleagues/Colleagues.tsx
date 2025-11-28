'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';

import { Icon, InputSearch, PaginationSimple } from '@/components/ui';
import {
  TradeUnionCard,
  Table,
  UploadUsersDialog,
} from '@/components/sections/Colleagues';

import { useFetchProfile } from '@/hooks/useFetchProfile';

import { useFetchTUOwner, useFetchUserTUs } from '@/hooks/useTU';
import { ITradeUnion } from '@/models/TradeUnion';
import { IFormColleagueProfile } from '@/models/Colleague';
import {
  deleteColleagueProfile,
  useFetchColleagueList,
} from '@/hooks/UseFormColleagueProfile';

const KEY_PARAM_ORGANIZATION = 'organization';

const ColleaguesWrapper = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { info } = useFetchProfile();
  const tuList = useFetchUserTUs();
  const tuOwner = useFetchTUOwner();

  const [count, setCount] = useState<{ max: number | null; total: number }>({
    max: null,
    total: 0,
  });

  const [search, setSearch] = useState<string>(params?.get('q') || '');
  const perPageColleagueList = 10;
  const {
    data: {
      data: colleagueList,
      isFetching: isLoadingColleagueList,
      page: pageColleagueList,
      total: totalColleagueList,
    },
    actions: {
      loadPrev: loadPrevColleagueList,
      loadNext: loadNextColleagueList,
      refetch: refetchColleagueList,
    },
  } = useFetchColleagueList({
    type: 'page',
    prename: 'edit',
    perPage: perPageColleagueList,
    guid: params?.get(KEY_PARAM_ORGANIZATION) || '',
    search,
  });

  const [openCountDialog, setOpenCountDialog] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [userDelete, setUserDelete] = useState<IFormColleagueProfile | null>(
    null,
  );

  const tuActive: ITradeUnion | null = useMemo(
    () =>
      tuList?.find(
        (el) => el.guid == (params?.get(KEY_PARAM_ORGANIZATION) ?? -1),
      ) ?? null,
    [tuList, params],
  );

  const handleClickTradeunion = (data: ITradeUnion) => {
    // unselect !?
    if (data.guid == tuActive?.guid) {
      //router.push(`${window.location.pathname}`);
      refetchColleagueList();
      return;
    }

    router.push(
      `${window.location.pathname}?${KEY_PARAM_ORGANIZATION}=${data.guid}`,
    );
    refetchColleagueList();
  };

  const handleClickUpload = () => {
    setOpenDialog(true);
  };

  const handleSuccessUpload = () => {
    refetchColleagueList();
  };

  const handleUserClick = (user: IFormColleagueProfile) => {
    router.push(`/colleagues/show/${user.guid}`);
  };

  const handleUserShow = (user: IFormColleagueProfile) => {
    router.push(`/colleagues/show/${user.guid}`);
  };

  const handleUserEdit = (user: IFormColleagueProfile) => {
    router.push(`/colleagues/edit/${user.guid}`);
  };

  const handleUserDelete = (user: IFormColleagueProfile) => {
    setUserDelete(user);
  };
  const handleUserDeleteAccept = async () => {
    if (userDelete == null) return;
    setUserDelete(null);
    await deleteColleagueProfile(userDelete);
    refetchColleagueList();
  };

  useEffect(() => {
    if (tuActive != null) return;
    if (tuList == null) return;
    if (tuList.length == 0) return;
    handleClickTradeunion(tuList[0]);
  }, [tuList, tuActive, handleClickTradeunion]);

  useEffect(() => {
    if (tuOwner && info?.ROLES?.includes('ROLE_TRADEUNION'))
      setCount({ max: tuOwner.numberOfUsers, total: tuOwner.countOfUsers });
    else setCount({ max: null, total: totalColleagueList });
  }, [tuOwner, info, tuActive, totalColleagueList]);

  useEffect(() => {
    if (
      count.total >= Number(count.max) &&
      info?.ROLES?.includes('ROLE_TRADEUNION')
    )
      setOpenCountDialog(true);
  }, [count, info]);

  return (
    <>
      <Box display="flex" flexDirection="column" gap={1.5} marginTop={3}>
        <Typography variant="h3" marginBottom={2}>
          Коллеги
        </Typography>

        {tuList && (
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <Box display="flex" flexWrap="wrap" gap={1.5}>
              {tuList?.map((el) => (
                <TradeUnionCard
                  key={el.guid}
                  data={el}
                  count={count.total}
                  max={count.max}
                  onClick={handleClickTradeunion}
                  active={tuActive?.guid == el.guid}
                />
              ))}
            </Box>

            {tuActive && info?.hasTradeunionOwner && (
              <Box
                display="flex"
                flexDirection="column"
                minWidth="fit-content"
                marginTop="auto"
                gap={1.5}
              >
                <Link
                  href={
                    count.total >= Number(count.max) ? '' : '/colleagues/create'
                  }
                  style={{
                    gap: 1,
                    height: 'fit-content',
                    width: '100%',
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      gap: 1,
                      height: 'fit-content',
                      width: '100%',
                    }}
                    disabled={count.total >= Number(count.max)}
                  >
                    <Icon name="plus" color="secondary.main" />
                    Добавить участника
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  sx={{
                    gap: 1,
                    height: 'fit-content',
                    minWidth: 'fit-content',
                    marginTop: 'auto',
                  }}
                  disabled={count.total >= Number(count.max)}
                  onClick={handleClickUpload}
                >
                  <Icon name="upload" color="secondary.main" />
                  Загрузить участников
                </Button>
              </Box>
            )}
          </Box>
        )}

        <InputSearch
          defaultValue={search}
          onSearch={setSearch}
          disabled={isLoadingColleagueList}
        />

        <Table
          users={(tuActive && colleagueList) || []}
          tradeunion={tuActive}
          owner={info?.hasTradeunionOwner}
          onClick={handleUserClick}
          onShow={handleUserShow}
          onEdit={handleUserEdit}
          onDelete={handleUserDelete}
          disabled={isLoadingColleagueList}
        />

        <PaginationSimple
          page={pageColleagueList}
          perPage={perPageColleagueList}
          total={totalColleagueList}
          loading={isLoadingColleagueList}
          onPrev={loadPrevColleagueList}
          onNext={loadNextColleagueList}
        />
      </Box>

      {count.total >= Number(count.max) && (
        <Dialog
          open={openCountDialog}
          onClose={() => setOpenCountDialog(false)}
          PaperProps={{
            sx: {
              p: 4,
              gap: 2,
            },
          }}
        >
          <IconButton
            sx={{ position: 'absolute', right: 10, top: 10 }}
            onClick={() => setOpenCountDialog(false)}
          >
            <Icon name="close" />
          </IconButton>
          <Typography variant="h3" textAlign="center" whiteSpace="pre-line">
            Вы достигли максимального количества пользователей в тарифе. Чтобы
            добавить новых пользователей перейдите на другой тариф
          </Typography>
        </Dialog>
      )}

      {info?.hasTradeunionOwner && (
        <UploadUsersDialog
          open={openDialog}
          defaultTradeUnion={tuActive}
          onClose={() => setOpenDialog(false)}
          onSuccess={handleSuccessUpload}
        />
      )}

      <Dialog
        open={Boolean(userDelete)}
        onClose={() => setUserDelete(null)}
        PaperProps={{
          sx: {
            p: 4,
            gap: 2,
          },
        }}
      >
        {userDelete && (
          <Typography fontSize={18} fontWeight={500} textAlign={'center'}>
            Удалить пользователя <b>{userDelete.name}</b>?
          </Typography>
        )}

        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            sx={{
              bgcolor: 'red !important',
            }}
            onClick={handleUserDeleteAccept}
          >
            Удалить
          </Button>
          <Button onClick={() => setUserDelete(null)}>Отмена</Button>
        </Box>
      </Dialog>
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
