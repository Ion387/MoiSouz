'use client';

import NewProfileDialog from '@/components/entities/profile/newProfileDialog';
import Table from '@/components/sections/Docs/Table';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { getDocs } from '@/services/getDocs';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DocumentsPage = () => {
  const { data: docs, isLoading } = useQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    select: (data) => data.data,
  });

  const info = useFetchProfile();
  const [open, setOpen] = useState(
    !!info?.ROLES?.includes('ROLE_TRADEUNION') && !info?.hasTradeunionOwner,
  );
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
      <Typography variant="h3" marginBottom={2}>
        Документы
      </Typography>
      <Table docs={Array.isArray(docs) ? docs : []} />
      <NewProfileDialog
        open={
          !info?.ROLES?.includes('ROLE_TRADEUNION') &&
          docs &&
          !docs.length &&
          !isLoading
        }
        btn="Вступить в профсоюз"
        link="/trade_union_member"
        title="Для просмотра раздела необходимо стать участником профсоюза"
        onClose={() => {}}
      />
      <NewProfileDialog
        open={open}
        btn="Заполнить"
        link="/profile"
        title="Заполните анкету профсоюза (в случае, если анкета заполнена, дождитесь подтверждения от администрации сайта)"
        onClose={path.includes('profile') ? () => setOpen(false) : () => {}}
      />
    </Box>
  );
};

export default DocumentsPage;
