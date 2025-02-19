'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Box, Button, Typography } from '@mui/material';

import { Icon } from '@/components/ui';
import Table from '@/components/sections/Colleagues/Table';

import { IColleague, IOrganization } from '@/models/Colleagues';
import OrganizationCard from '@/components/sections/Colleagues/OrganizationCard';
import { UploadUsersDialog } from '@/components/sections/Colleagues/UploadUsersDialog';

// temp
const ORGANIZATIONS: IOrganization[] = [
  {
    id: 1,
    name: 'Организация 1',
    count: 0,
  },
  {
    id: 2,
    name: 'Организация 2',
    count: 0,
  },
];

// temp
const USERS: IColleague[] = [
  {
    id: 1,
    fio: 'ФИО 1',
    organization: {
      id: 1,
      name: 'Организация 1',
    },
    position: 'Должность 1',
    contact: 'Контакты 1',
  },
  {
    id: 2,
    fio: 'ФИО 2',
    organization: {
      id: 1,
      name: 'Организация 1',
    },
    position: 'Должность 2',
    contact: 'Контакты 2',
  },
  {
    id: 3,
    fio: 'ФИО 3',
    organization: {
      id: 1,
      name: 'Организация 1',
    },
    position: 'Должность 3',
    contact: 'Контакты 3',
  },

  {
    id: 4,
    fio: 'ФИО 4',
    organization: {
      id: 2,
      name: 'Организация 2',
    },
    position: 'Должность 4',
    contact: 'Контакты 4',
  },
  {
    id: 5,
    fio: 'ФИО 5',
    organization: {
      id: 2,
      name: 'Организация 2',
    },
    position: 'Должность 5',
    contact: 'Контакты 5',
  },
  {
    id: 6,
    fio: 'ФИО 6',
    organization: {
      id: 2,
      name: 'Организация 2',
    },
    position: 'Должность 6',
    contact: 'Контакты 6',
  },
  {
    id: 7,
    fio: 'ФИО 7',
    organization: {
      id: 2,
      name: 'Организация 2',
    },
    position: 'Должность 7',
    contact: 'Контакты 7',
  },
  {
    id: 8,
    fio: 'ФИО 8',
    organization: {
      id: 2,
      name: 'Организация 2',
    },
    position: 'Должность 8',
    contact: 'Контакты 8',
  },
  {
    id: 9,
    fio: 'ФИО 9',
    organization: {
      id: 2,
      name: 'Организация 2',
    },
    position: 'Должность 9',
    contact: 'Контакты 9',
  },
];

const KEY_PARAM_ORGANIZATION = 'organization';

const ColleaguesWrapper = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const organizations: IOrganization[] = useMemo(
    () =>
      ORGANIZATIONS.map((el) => ({
        ...el,
        count: USERS.filter((user) => user.organization.id == el.id).length,
      })),
    [ORGANIZATIONS, USERS],
  );

  const organization: IOrganization | null = useMemo(
    () =>
      ORGANIZATIONS.find(
        (el) => el.id == (params?.get(KEY_PARAM_ORGANIZATION) ?? -1),
      ) ?? null,
    [ORGANIZATIONS, params],
  );

  const users: IColleague[] = useMemo(
    () =>
      organization == null
        ? USERS
        : USERS.filter((el) => el.organization.id == organization.id),
    [USERS, organization],
  );

  const handleClickOrganization = (organization: IOrganization) => {
    router.push(
      `${window.location.pathname}?${KEY_PARAM_ORGANIZATION}=${organization.id}`,
    );
  };

  const handleClickUpload = () => {
    setOpenDialog(true);
  };

  const handleSuccessUpload = () => {
    // reload organizations list !?
    console.log('success upload');
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap={1.5} marginTop={3}>
        <Typography variant="h3" marginBottom={2}>
          Коллеги
        </Typography>

        <Box display="flex" justifyContent="space-between" gap={1.5}>
          <Box display="flex" flexWrap="wrap" gap={1.5}>
            {organizations.map((el) => (
              <OrganizationCard
                key={el.id}
                data={el}
                onClick={handleClickOrganization}
                active={organization?.id == el.id}
              />
            ))}
          </Box>
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
        </Box>

        <Table data={users} />
      </Box>

      <UploadUsersDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={handleSuccessUpload}
      />
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
