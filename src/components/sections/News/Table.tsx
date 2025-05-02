import {
  Box,
  ButtonBase,
  Divider,
  Grid2,
  Paper,
  Typography,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Popover,
  CircularProgress,
} from '@mui/material';
import { FC, PropsWithChildren, useState } from 'react';

import { IFormNews } from '@/models/News';
import { Icon } from '@/components/ui';
import { PropsWithSX } from '@/models/Props';
import Image from 'next/image';
import { getBackendUrl } from '@/constants/url';

interface IRowProps {
  news: IFormNews;
  clickable?: boolean;
  disabled?: boolean;

  onClick?: (user: IFormNews) => void;
}

const Row: FC<PropsWithChildren & PropsWithSX & IRowProps> = ({
  children,
  sx,
  news,
  clickable,
  disabled,
  onClick,
}) => {
  if (clickable) {
    return (
      <ButtonBase
        sx={{ width: '100%', ...(sx || {}) }}
        onClick={() => onClick && onClick(news)}
        disabled={disabled}
      >
        {children}
      </ButtonBase>
    );
  }
  return children;
};

interface ITableProps {
  news: IFormNews[] | null;
  newsLoading?: IFormNews | null;
  owner?: boolean;
  onClick?: (user: IFormNews) => void;
  onShow?: (user: IFormNews) => void;
  onEdit?: (user: IFormNews) => void;
  onDelete?: (user: IFormNews) => void;
}

export const Table: FC<ITableProps> = ({
  news,
  newsLoading,
  owner,
  onClick,
  onShow,
  onEdit,
  onDelete,
}) => {
  const groupedData = news;

  const [openMenu, setOpenMenu] = useState<{
    index: number;
    anchorE1: HTMLElement;
  } | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenMenu({
      index,
      anchorE1: event.currentTarget,
    });
  };
  const handleMenuClose = () => {
    setOpenMenu(null);
  };

  const handleRowClick = (item: IFormNews) => {
    handleMenuClose();
    if (openMenu) return;
    if (newsLoading?.code == item.code) return;
    if (onClick) onClick(item);
  };

  const handleMenuShow = (item: IFormNews) => {
    handleMenuClose();
    if (newsLoading?.code == item.code) return;
    if (onShow) onShow(item);
  };

  const handleMenuEdit = (item: IFormNews) => {
    handleMenuClose();
    if (newsLoading?.code == item.code) return;
    if (onEdit) onEdit(item);
  };

  const handleMenuDelete = (item: IFormNews) => {
    handleMenuClose();
    if (newsLoading?.code == item.code) return;
    if (onDelete) onDelete(item);
  };

  return (
    <Paper sx={{ p: 0, pb: 1.6 }}>
      <Grid2 container sx={{ p: 1.6 }}>
        <Grid2 size={3}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Заголовок
          </Typography>
        </Grid2>
        <Grid2 size={3}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Првеью
          </Typography>
        </Grid2>
        <Grid2 size={4}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
          >
            Изображение
          </Typography>
        </Grid2>
        <Grid2 size={!!owner ? 1.5 : 2.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
          >
            Дата
          </Typography>
        </Grid2>
      </Grid2>
      <Divider></Divider>
      {groupedData && !!groupedData.length ? (
        groupedData.map((el, index, arr) => (
          <Box key={el.id}>
            <Row
              sx={{
                backgroundColor: `${
                  openMenu?.index == index ? 'rgba(0,0,0,0.1)' : ''
                } !important`,
              }}
              news={el}
              clickable={true}
              onClick={handleRowClick}
            >
              <Grid2
                container
                sx={{
                  p: 1.6,
                  width: '100%',
                  textAlign: 'left',
                  userSelect: owner ? 'none' : 'all',
                }}
              >
                <Grid2 size={3}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                  >
                    {el.title}
                  </Typography>
                </Grid2>
                <Grid2 size={3}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                  >
                    {el.preview}
                  </Typography>
                </Grid2>
                <Grid2 size={4}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                  >
                    <Image
                      src={`${getBackendUrl}${el.image?.toString() || ''}`}
                      width={100}
                      height={100}
                      objectFit="contain"
                      alt=""
                    />
                  </Typography>
                </Grid2>
                <Grid2 size={!!owner ? 1.5 : 2.5}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                  >
                    {el.date}
                  </Typography>
                </Grid2>
                {!!owner && (
                  <Grid2 size={0.5}>
                    {newsLoading?.code == el.code ? (
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        width={'100%'}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        <IconButton onClick={(e) => handleMenuOpen(e, index)}>
                          <Icon name="menu" color="darkgray" />
                        </IconButton>
                        <Popover
                          id="user-menu"
                          anchorEl={openMenu?.anchorE1}
                          open={openMenu?.index == index}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          slotProps={{
                            paper: {
                              variant: 'popover',
                            },
                          }}
                          disableScrollLock
                        >
                          <MenuItem onClick={() => handleMenuShow(el)}>
                            <ListItemIcon>
                              <Icon name="eye-on" />
                            </ListItemIcon>
                            <ListItemText>Посмотреть</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={() => handleMenuEdit(el)}>
                            <ListItemIcon>
                              <Icon name="edit" />
                            </ListItemIcon>
                            <ListItemText>Редактировать</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={() => handleMenuDelete(el)}>
                            <ListItemIcon>
                              <Icon name="delete" color="red" />
                            </ListItemIcon>
                            <ListItemText>Удалить</ListItemText>
                          </MenuItem>
                        </Popover>
                      </>
                    )}
                  </Grid2>
                )}
              </Grid2>
            </Row>
            {index !== arr.length - 1 && <Divider></Divider>}
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1.2,
          }}
        >
          <Typography variant="h3">Здесь пока пусто</Typography>
        </Box>
      )}
    </Paper>
  );
};
