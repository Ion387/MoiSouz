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
import { Icon as IconArrowBack } from '@/assets/icons/arrow-back';
import { Icon as IconArrowDropdown } from '@/assets/icons/arrow-dropdown';
import { Icon as IconPlus } from '@/assets/icons/plus';
import { Icon as IconMinus } from '@/assets/icons/minus';
import { Icon as IconFileAdd } from '@/assets/icons/file-add';
import { Icon as IconFileCloud } from '@/assets/icons/cloud';
import { Icon as IconFilePDF } from '@/assets/icons/pdf';
import { Icon as IconFileEdit } from '@/assets/icons/edit';
import { Icon as IconHelp } from '@/assets/icons/help';
import { Icon as IconClose } from '@/assets/icons/close';
import { Icon as IconPrint } from '@/assets/icons/print';
import { Icon as IconRepo } from '@/assets/icons/repo';
import { Icon as IconUpload } from '@/assets/icons/upload';
import { Icon as IconBenefitsCoin } from '@/assets/icons/benefits-coin';
import { Icon as IconBenefitsGift } from '@/assets/icons/benefits-gift';
import { Icon as IconBenefitsChart } from '@/assets/icons/benefits-chart';
import { Icon as IconNewDoc } from '@/assets/icons/new-doc';
import { Icon as IconBBPercents } from '@/assets/icons/bb-percents';
import { Icon as IconBBNew } from '@/assets/icons/bb-new';
import { Icon as IconBBHd } from '@/assets/icons/bb-hd';
import { Icon as IconBBShop } from '@/assets/icons/bb-shop';
import { Icon as IconBBFood } from '@/assets/icons/bb-food';
import { Icon as IconBBEduc } from '@/assets/icons/bb-educ';
import { Icon as IconBBRelax } from '@/assets/icons/bb-relax';
import { Icon as IconBBSport } from '@/assets/icons/bb-sport';
import { Icon as IconBBHealth } from '@/assets/icons/bb-health';
import { Icon as IconBBChild } from '@/assets/icons/bb-child';
import { Icon as IconBBEnjoy } from '@/assets/icons/bb-enjoy';
import { Icon as IconBBDeals } from '@/assets/icons/bb-deals';
import { Icon as IconMail } from '@/assets/icons/mail';

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
  'arrow-back',
  'arrow-dropdown',
  'plus',
  'minus',
  'file-add',
  'cloud',
  'pdf',
  'print',
  'edit',
  'help',
  'close',
  'repo',
  'upload',
  'benefits-coin',
  'benefits-gift',
  'benefits-chart',
  'newDoc',
  'bb-percents',
  'bb-new',
  'bb-hd',
  'bb-shop',
  'bb-food',
  'bb-educ',
  'bb-relax',
  'bb-sport',
  'bb-health',
  'bb-child',
  'bb-enjoy',
  'bb-deals',
  'mail',
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
  'arrow-back': <IconArrowBack />,
  'arrow-dropdown': <IconArrowDropdown />,
  plus: <IconPlus />,
  minus: <IconMinus />,
  'file-add': <IconFileAdd />,
  cloud: <IconFileCloud />,
  pdf: <IconFilePDF />,
  edit: <IconFileEdit />,
  help: <IconHelp />,
  close: <IconClose />,
  print: <IconPrint />,
  repo: <IconRepo />,
  upload: <IconUpload />,
  'benefits-coin': <IconBenefitsCoin />,
  'benefits-gift': <IconBenefitsGift />,
  'benefits-chart': <IconBenefitsChart />,
  newDoc: <IconNewDoc />,
  'bb-percents': <IconBBPercents />,
  'bb-new': <IconBBNew />,
  'bb-hd': <IconBBHd />,
  'bb-shop': <IconBBShop />,
  'bb-food': <IconBBFood />,
  'bb-educ': <IconBBEduc />,
  'bb-relax': <IconBBRelax />,
  'bb-sport': <IconBBSport />,
  'bb-health': <IconBBHealth />,
  'bb-child': <IconBBChild />,
  'bb-enjoy': <IconBBEnjoy />,
  'bb-deals': <IconBBDeals />,
  mail: <IconMail />,
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
