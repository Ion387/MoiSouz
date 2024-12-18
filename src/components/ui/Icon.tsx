import { FC } from 'react';
import { Typography } from '@mui/material';

import {
  PropsWithClassName,
  PropsWithStyle,
  PropsWithSX,
} from '@/models/Props';

import IconDocument from '@/assets/icons/document.svg';
import IconGift from '@/assets/icons/gift.svg';
import IconInfo from '@/assets/icons/info.svg';
import IconMoney from '@/assets/icons/money.svg';
import IconNotify from '@/assets/icons/notify.svg';
import IconPeoples from '@/assets/icons/peoples.svg';
import IconSquare2x2 from '@/assets/icons/square-2x2.svg';
import IconSquare3x3 from '@/assets/icons/square-3x3.svg';
import IconTasks from '@/assets/icons/tasks.svg';
import IconTime from '@/assets/icons/time.svg';
import IconMenu from '@/assets/icons/menu.svg';
import IconCross from '@/assets/icons/cross.svg';
import IconAvatarWomen from '@/assets/icons/avatar-women.svg';
import IconBook from '@/assets/icons/book.svg';
import IconArrowUp from '@/assets/icons/arrow-up.svg';
import IconHeart from '@/assets/icons/heart.svg';
import IconLogout from '@/assets/icons/logout.svg';
import IconEyeOn from '@/assets/icons/eye-on.svg';
import IconEyeOff from '@/assets/icons/eye-off.svg';
import IconBell from '@/assets/icons/bell.svg';
import IconArrowDropdown from '@/assets/icons/arrow-dropdown.svg';

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
] as const;
export type IconName = (typeof NAMES)[number];

const ICONS: { [key: string]: any } = {
  document: IconDocument,
  gift: IconGift,
  info: IconInfo,
  money: IconMoney,
  notify: IconNotify,
  peoples: IconPeoples,
  'square-2x2': IconSquare2x2,
  'square-3x3': IconSquare3x3,
  tasks: IconTasks,
  time: IconTime,
  menu: IconMenu,
  cross: IconCross,
  'avatar-women': IconAvatarWomen,
  book: IconBook,
  'arrow-up': IconArrowUp,
  heart: IconHeart,
  logout: IconLogout,
  'eye-on': IconEyeOn,
  'eye-off': IconEyeOff,
  bell: IconBell,
  'arrow-dropdown': IconArrowDropdown,
};

interface Props {
  name: IconName;
  color?: string;
}

export const Icon: FC<
  Props & PropsWithClassName & PropsWithStyle & PropsWithSX
> = ({ name, color = 'primary', className, style, sx }) => {
  if (ICONS[name] == null) return null;
  return (
    <Typography sx={sx} color={color}>
      {ICONS[name]({ className, style })}
    </Typography>
  );
};
