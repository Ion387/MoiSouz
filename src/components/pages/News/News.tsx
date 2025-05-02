'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from '@mui/material';

import { Icon, InputAutocomplete } from '@/components/ui';
import { Table } from '@/components/sections/News';

import { useFetchProfile } from '@/hooks/useFetchProfile';
import { deleteFormNews, useFetchNewsList } from '@/hooks/useNews';
import { IFormNews } from '@/models/News';
import { IOptionValue } from '@/models/Option';

import { OPTIONS_NEWS_STATUS } from '@/constants/options';

const KEY_PARAM_STATUS = 'status';

const NewsListEditWrapper = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<IOptionValue | null>(
    params.get(KEY_PARAM_STATUS),
  );

  const info = useFetchProfile();
  const {
    data: newsList,
    isLoading: loadingNewsList,
    refetch: refetchNewsList,
  } = useFetchNewsList();

  const [newsDelete, setNewsDelete] = useState<IFormNews | null>(null);
  const [newsDeleting, setNewsDeleting] = useState<IFormNews | null>(null);

  useEffect(() => {
    setStatus(params.get(KEY_PARAM_STATUS));
  }, [params]);

  const handleChangeStatus = (value: IOptionValue | null) => {
    if (status == value) return;

    if (value != null)
      router.push(`${window.location.pathname}?${KEY_PARAM_STATUS}=${value}`);
    else
      router.push(`${window.location.pathname}?${KEY_PARAM_STATUS}=published`);

    setStatus(value);
    refetchNewsList();
  };

  const handleClick = (newsOne: IFormNews) => {
    router.push(`/news/edit/${newsOne.code}`);
  };

  const handleShow = (newsOne: IFormNews) => {
    //router.push(`/news/${newsOne.code}`);
    window.open(`/news/${newsOne.code}`, '_blank');
  };

  const handleEdit = (newsOne: IFormNews) => {
    router.push(`/news/edit/${newsOne.code}`);
  };

  const handleDelete = (newsOne: IFormNews) => {
    setNewsDelete(newsOne);
  };
  const handleNewsDeleteAccept = async () => {
    if (newsDelete == null) return;
    setNewsDelete(null);
    setNewsDeleting(newsDelete);
    await deleteFormNews(newsDelete);
    await refetchNewsList();
    setNewsDeleting(null);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={1.5} marginTop={3}>
        <Typography variant="h3" marginBottom={2}>
          Новости
        </Typography>

        {newsList && (
          <Box display="flex" justifyContent="space-between" gap={1.5}>
            <InputAutocomplete
              sx={{ width: 250 }}
              options={OPTIONS_NEWS_STATUS}
              placeholder="Все"
              value={status}
              onChange={handleChangeStatus}
            />

            {info?.hasTradeunionOwner && (
              <Box
                display="flex"
                flexDirection="column"
                minWidth="fit-content"
                marginTop="auto"
                gap={1.5}
              >
                <Link
                  href="/news/create"
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
                  >
                    <Icon name="plus" color="secondary.main" />
                    Добавить новость
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        )}

        {!loadingNewsList ? (
          <Table
            news={newsList || []}
            newsLoading={newsDeleting}
            owner={info?.hasTradeunionOwner}
            onClick={handleClick}
            onShow={handleShow}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <Box display={'flex'} justifyContent={'center'} width={'100%'}>
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Dialog
        open={Boolean(newsDelete)}
        onClose={() => setNewsDelete(null)}
        PaperProps={{
          sx: {
            p: 4,
            gap: 2,
          },
        }}
        disableScrollLock
      >
        {newsDelete && (
          <Typography fontSize={18} fontWeight={500} textAlign={'center'}>
            Удалить новость <b>{newsDelete.title}</b>?
          </Typography>
        )}

        <Box display="flex" justifyContent="space-around">
          <Button
            variant="contained"
            sx={{
              bgcolor: 'red !important',
            }}
            onClick={handleNewsDeleteAccept}
          >
            Удалить
          </Button>
          <Button onClick={() => setNewsDelete(null)}>Отмена</Button>
        </Box>
      </Dialog>
    </>
  );
};

const NewsListEditPage = () => {
  return (
    <Suspense>
      <NewsListEditWrapper />
    </Suspense>
  );
};

export default NewsListEditPage;
