/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
}

interface PropsChildren {
  indent?: number;
  children?: ReactElement | ReactElement[];
}

interface PropsItem extends Props {
  selected?: boolean;
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
    if (selected) setOpen(!open);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClick && onClick();
  };

  useEffect(() => {
    if (selected) setOpen(!open);
  }, [selected]);

  return (
    <>
      <ListItemButton
        sx={{ pl: indent ? 4.6 * indent : undefined }}
        selected={selected}
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
      <Collapse in={openAlways || open} timeout="auto" unmountOnExit>
        {children && (
          <List component="div" disablePadding>
            {<Children indent={indent}>{children}</Children>}
          </List>
        )}
      </Collapse>
    </>
  );
};

export const ListItem: FC<Props> = ({ to, ...props }) => {
  const pathname = usePathname();

  if (to && to != pathname) {
    return (
      <Link href={to}>
        <Item {...props} selected={to == pathname} />
      </Link>
    );
  }

  return <Item {...props} selected={to == pathname} />;
};
