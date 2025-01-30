import { ListItem } from '@/components/ui';
import { Paper } from '@mui/material';
import React from 'react';

const ScanBlock = ({ number }: { number: string }) => {
  return (
    <Paper>
      <ListItem
        label="Редактировать"
        to={`/documents/drafts/${number}`}
        icon="edit"
      />
      <ListItem label="Создать такой же" icon="plus" to={`/documents/`} />
    </Paper>
  );
};

export default ScanBlock;
