'use client';

import React, { FC, useMemo } from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { TradeUnionCardSimple } from './TradeUnionCardSimple';

import { IFormColleagueProfile } from '@/models/Colleague';
import { useFetchTUOwner, useFetchTUs } from '@/hooks/useTU';

import { ITradeUnion } from '@/models/TradeUnion';
import { getBackendUrl } from '@/constants/url';
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface PropsField {
  name: string;
  value?: string | number;
  big?: boolean;
}

const Field: FC<PropsField> = ({ name, value, big }) => {
  return (
    <Box
      display="flex"
      flexDirection={big ? 'column' : 'row'}
      gap={0.5}
      marginTop={1}
    >
      <Typography fontSize={14} fontWeight="bold">
        {name}
        {!big && ':'}
      </Typography>
      <Typography fontSize={14} fontWeight={600} color="darkgray">
        {value}
      </Typography>
    </Box>
  );
};

interface Props {
  user: IFormColleagueProfile;
}

export const ColleagueCardExtended: FC<Props> = ({ user }) => {
  const tuOwner = useFetchTUOwner();
  const tuList = useFetchTUs();
  const tradeunion: ITradeUnion | undefined = useMemo(
    () =>
      tuOwner && tuList?.data
        ? tuList.data.find((el) => el.guid == tuOwner?.guid)
        : undefined,
    [tuOwner, tuList],
  );

  if (user == null) return null;

  dayjs.extend(customParseFormat);

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="white"
      borderRadius={4}
      overflow="hidden"
      boxShadow="5px 5px 30px rgba(0,0,0,0.2)"
      padding={2}
    >
      <Box display="flex">
        {tradeunion && <TradeUnionCardSimple data={tradeunion} />}
        <Typography
          fontSize={14}
          marginLeft="auto"
          fontWeight={500}
        >{`№${user.id}`}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box>
          <Field
            name="ФИО"
            value={[user.firstName, user.lastName, user.middleName]
              .filter((el) => el)
              .join(' ')}
          />

          <Field
            name="Год рождения"
            value={dayjs(user.birthdate, 'DD.MM.YYYY').format('YYYY')}
          />

          <Field
            name="Основная профессия"
            value={user.position && user.position[0]}
          />

          <Field
            name="Специальность по образованию"
            value={user.profession && user.profession[0]}
          />

          <Field name="Образование" value={user.education} />
        </Box>

        {user.avatar && (
          <Image
            src={`${getBackendUrl}${user.avatar as string}`}
            width={200}
            height={250}
            style={{ objectFit: 'cover', borderRadius: 10 }}
            alt=""
          />
        )}
      </Box>

      {user.history && (
        <Typography fontSize={16} fontWeight="bold" marginTop={4}>
          История участия в профсоюзных организациях
        </Typography>
      )}

      {user.history?.map((el, i) => (
        <Box key={`history-${i}`} marginTop={2}>
          <Field name="Название организации" value={el.name} big />
          <Field name="Дата принятия" value={el.startDate} />
          <Field name="Дата выхода" value={el.finishDate} />
        </Box>
      ))}
    </Box>
  );
};
