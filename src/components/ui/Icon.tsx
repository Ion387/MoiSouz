/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, JSX } from 'react';
import { Typography } from '@mui/material';

import {
  PropsWithClassName,
  PropsWithStyle,
  PropsWithSX,
} from '@/models/Props';

import { Icon as IconDocument } from '@/assets/icons/document';
import { Icon as IconGift } from '@/assets/icons/gift';
import { Icon as IconInfo } from '@/assets/icons/info';
import { Icon as IconMoney } from '@/assets/icons/money';
import { Icon as IconNotify } from '@/assets/icons/notify';
import { Icon as IconPeoples } from '@/assets/icons/peoples';
import { Icon as IconSquare2x2 } from '@/assets/icons/square-2x2';
import { Icon as IconSquare3x3 } from '@/assets/icons/square-3x3';
import { Icon as IconTasks } from '@/assets/icons/tasks';
import { Icon as IconTime } from '@/assets/icons/time';
import { Icon as IconMenu } from '@/assets/icons/menu';
import { Icon as IconCross } from '@/assets/icons/cross';
import { Icon as IconAvatarWomen } from '@/assets/icons/avatar-women';
import { Icon as IconBook } from '@/assets/icons/book';
import { Icon as IconArrowUp } from '@/assets/icons/arrow-up';
import { Icon as IconHeart } from '@/assets/icons/heart';
import { Icon as IconLogout } from '@/assets/icons/logout';
import { Icon as IconEyeOn } from '@/assets/icons/eye-on';
import { Icon as IconEyeOff } from '@/assets/icons/eye-off';
import { Icon as IconBell } from '@/assets/icons/bell';
import { Icon as IconArrowDropdown } from '@/assets/icons/arrow-dropdown';
import { Icon as IconPlus } from '@/assets/icons/plus';
import { Icon as IconMinus } from '@/assets/icons/minus';
import { Icon as IconFileAdd } from '@/assets/icons/file-add';
import { Icon as IconFileCloud } from '@/assets/icons/cloud';
import { Icon as IconFilePDF } from '@/assets/icons/pdf';

const NAMES = [
  'document',
  'gift',
  'info',
  'money',
  'notify',
  'peoples',
  'square-2x2',
  'square-3x3',
  'tasks',
  'time',
  'menu',
  'cross',
  'avatar-women',
  'book',
  'arrow-up',
  'heart',
  'logout',
  'eye-on',
  'eye-off',
  'bell',
  'arrow-dropdown',
  'plus',
  'minus',
  'file-add',
  'cloud',
  'pdf',
] as const;
export type IconName = (typeof NAMES)[number];

const ICONS: { [key: string]: JSX.Element } = {
  document: <IconDocument />,
  gift: <IconGift />,
  info: <IconInfo />,
  money: <IconMoney />,
  notify: <IconNotify />,
  peoples: <IconPeoples />,
  'square-2x2': <IconSquare2x2 />,
  'square-3x3': <IconSquare3x3 />,
  tasks: <IconTasks />,
  time: <IconTime />,
  menu: <IconMenu />,
  cross: <IconCross />,
  'avatar-women': <IconAvatarWomen />,
  book: <IconBook />,
  'arrow-up': <IconArrowUp />,
  heart: <IconHeart />,
  logout: <IconLogout />,
  'eye-on': <IconEyeOn />,
  'eye-off': <IconEyeOff />,
  bell: <IconBell />,
  'arrow-dropdown': <IconArrowDropdown />,
  plus: <IconPlus />,
  minus: <IconMinus />,
  'file-add': <IconFileAdd />,
  cloud: <IconFileCloud />,
  pdf: <IconFilePDF />,
};

interface Props {
  name: IconName;
  color?: string;
}

export const Icon: FC<
  Props & PropsWithClassName & PropsWithStyle & PropsWithSX
> = ({ name, color = 'primary', className, style, sx }) => {
  if (name == null) return null;
  return (
    <Typography sx={sx} color={color} lineHeight={0}>
      {ICONS[name]}
    </Typography>
  );
};
