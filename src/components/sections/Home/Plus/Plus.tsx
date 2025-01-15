import { Box, Typography } from '@mui/material';
import React from 'react';
import s from './plus.module.scss';
import Item from './Item';

const Plus = () => {
  return (
    <Box component={'section'} className={s.wrapper}>
      <Typography variant="h2" textTransform="uppercase">
        ПЛЮСЫ ДЛЯ ПРОФСОЮЗА
      </Typography>
      <Box className={s.box}>
        <Item
          title="БЕСПЛАТНО"
          text="Базовый функционал доступен бесплатно 14 дней"
          digits="До 50%"
          desc="Снижение стоимости владения в сравнении с аналогами"
        />
        <Item
          title="БЕЗОПАСНО"
          text="Персональные данные пользователей защищены в соответствии с законом"
          digits="До 50%"
          desc="Ускорение внутренних процедур за счет автоматизации"
        />
        <Item
          title="ЧЕСТНО"
          text="Прозрачная система голосований, опросов и принятия решений, и невозможность подделки результатов"
          digits="До 20%"
          desc="Рост бюджета за счёт роста престижа и привлечения новых участников"
        />
        <Item
          title="ЭФФЕКТИВНО"
          text="Больше времени на основную деятельность позволяет повышать качество, производительность и безопасности труда, обеспечить контролируемый рост оплаты труда и улучшение условий"
          digits="До 10%"
          desc="Рост бюджета за счёт внедрения новых инструментов краудсорсинга и краудфандинга на реализацию знаковых проектов"
        />
      </Box>
    </Box>
  );
};

export default Plus;
