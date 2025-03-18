/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { FC, ReactElement, Suspense, useMemo, useState } from 'react';
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Icon, IconName } from '@/components/ui';

interface Props {
  label: string;
  icon?: IconName;
  to?: string;
  indent?: number;
  openDefault?: boolean;
  openAlways?: boolean;
  children?: ReactElement | ReactElement[];
  onClick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
}

interface PropsChildren {
  indent?: number;
  children?: ReactElement | ReactElement[];
}

interface PropsItem extends Props {
  selected?: boolean;
  opened?: boolean;
}
const Children = ({ indent = 0, children }: PropsChildren) => {
  return useMemo(() => {
    if (children == null) return null;
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          indent: indent + 1,
        });
      }
      return child;
    });
  }, [children]);
};

const Item: FC<PropsItem> = ({
  label,
  icon,
  selected,
  indent = 0,
  openDefault = false,
  openAlways = false,
  children,
  onClick,
  disabled,
}) => {
  const [open, setOpen] = useState(openDefault);

  const handleClick = () => {
    setOpen(!open);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClick && onClick();
  };

  return (
    <>
      <ListItemButton
        sx={{
          pl: indent ? 4.6 * indent : undefined,
          borderRadius: '6px',
        }}
        selected={selected && label !== 'Документы'}
        onClick={handleClick}
        disabled={disabled}
      >
        {icon && (
          <ListItemIcon sx={{ minWidth: 30 }}>
            <Icon name={icon} />
          </ListItemIcon>
        )}
        <ListItemText primary={label} />
        {/* Icon expand */}
        {/*children && (open ? <ExpandLess /> : <ExpandMore />)*/}
      </ListItemButton>
      {children && (
        <Collapse in={openAlways || open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {<Children indent={indent}>{children}</Children>}
          </List>
        </Collapse>
      )}
    </>
  );
};

const ListItemSP: FC<Props> = ({ to, hidden, ...props }) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const param = !!params.entries().toArray().length
    ? params.entries().toArray()[0][0]
    : null;

  if (to) {
    return (
      <Link href={to} style={{ width: '100%', display: hidden ? 'none' : '' }}>
        <Item
          {...props}
          selected={
            !param ? to == pathname : (pathname + '?' + param).startsWith(to)
          }
          opened={to.includes(pathname)}
        />
      </Link>
    );
  }

  return (
    <Item
      {...props}
      selected={!param ? to == pathname : to == pathname + '?' + param}
    />
  );
};

export const ListItem: FC<Props> = ({ ...props }) => {
  return (
    <Suspense>
      <ListItemSP {...props} />
    </Suspense>
  );
};
