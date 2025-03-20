import React, { FC } from 'react';
import NewProfileDialog from '../newProfileDialog';

interface Props {
  open: boolean;
}

export const TradeunionCheckDialog: FC<Props> = ({ open }) => {
  return (
    <NewProfileDialog
      open={open}
      btn="Вступить в профсоюз"
      link="/trade_union_member"
      title="Для того, чтобы воспользоваться всеми функциями системы, вступите в профсоюзную организацию"
      onClose={() => {}}
    />
  );
};
