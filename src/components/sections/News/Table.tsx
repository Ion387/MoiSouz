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
import { Icon, InputSwitch } from '@/components/ui';
import { PropsWithSX } from '@/models/Props';
import { OPTIONS_NEWS_STATUS } from '@/constants/options';
import { eventBlock } from '@/utils/event';

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
  newsLoading?: IFormNews[] | null;
  owner?: boolean;
  onClick?: (data: IFormNews) => void;
  onShow?: (data: IFormNews) => void;
  onEdit?: (data: IFormNews) => void;
  onDelete?: (data: IFormNews) => void;
  onChangeIsActive?: (data: IFormNews) => void;
  onChangeIsMain?: (data: IFormNews) => void;
}

export const Table: FC<ITableProps> = ({
  news,
  newsLoading = [],
  owner,
  onClick,
  onShow,
  onEdit,
  onDelete,
  onChangeIsActive,
  onChangeIsMain,
}) => {
  const groupedData = news;

  const isLoading = (item: IFormNews) =>
    newsLoading?.some((el) => el.id == item.id);

  const [openMenu, setOpenMenu] = useState<{
    index: number;
    anchorE1: HTMLElement;
  } | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    eventBlock(event);
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
    if (isLoading(item)) return;
    if (onClick) onClick(item);
  };

  const handleMenuShow = (item: IFormNews) => {
    handleMenuClose();
    if (isLoading(item)) return;
    if (onShow) onShow(item);
  };

  const handleMenuEdit = (item: IFormNews) => {
    handleMenuClose();
    if (isLoading(item)) return;
    if (onEdit) onEdit(item);
  };

  const handleMenuDelete = (item: IFormNews) => {
    handleMenuClose();
    if (isLoading(item)) return;
    if (onDelete) onDelete(item);
  };

  const handleIsActive = (item: IFormNews) => {
    if (isLoading(item)) return;
    if (onChangeIsActive) onChangeIsActive(item);
  };

  const handleIsMain = (item: IFormNews) => {
    if (isLoading(item)) return;
    if (onChangeIsMain) onChangeIsMain(item);
  };

  return (
    <Paper sx={{ p: 0, pb: 1.6 }}>
      <Grid2 container sx={{ p: 1.6 }}>
        <Grid2 size={1}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            №
          </Typography>
        </Grid2>
        <Grid2 size={3.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Заголовок
          </Typography>
        </Grid2>
        <Grid2 size={2}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign="center"
          >
            Дата
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
            textAlign="center"
          >
            Активность
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
            textAlign="center"
          >
            Закрепить
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
            textAlign="center"
          >
            Статус
          </Typography>
        </Grid2>
        <Grid2 size={1}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign="center"
          >
            Действия
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
                '&:disabled': {
                  opacity: 0.5,
                },
              }}
              news={el}
              clickable={true}
              onClick={handleRowClick}
              disabled={isLoading(el)}
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
                <Grid2 size={1}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                  >
                    {el.id}
                  </Typography>
                </Grid2>
                <Grid2 size={3.5}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                  >
                    {el.title}
                  </Typography>
                </Grid2>
                <Grid2 size={2}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                    textAlign="center"
                  >
                    {el.date}
                  </Typography>
                </Grid2>
                <Grid2 size={1.5} onClick={eventBlock}>
                  <Typography py={1} pl={2} textAlign="center">
                    <InputSwitch
                      checked={el.isActive == true}
                      onClick={(_) => handleIsActive && handleIsActive(el)}
                    />
                  </Typography>
                </Grid2>
                <Grid2 size={1.5} onClick={eventBlock}>
                  <Typography py={1} pl={2} textAlign="center">
                    <InputSwitch
                      checked={el.isMain == true}
                      onClick={(_) => handleIsMain && handleIsMain(el)}
                    />
                  </Typography>
                </Grid2>
                <Grid2 size={1.5}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    py={1}
                    sx={{ userSelect: 'none' }}
                    textAlign="center"
                  >
                    {
                      OPTIONS_NEWS_STATUS.find(
                        (option) => option.id == el.status,
                      )?.title
                    }
                  </Typography>
                </Grid2>
                {!!owner && (
                  <Grid2 size={1} textAlign="center">
                    {isLoading(el) ? (
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        width={'100%'}
                      >
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, index)}
                          sx={{ width: 42, height: 42 }}
                        >
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
