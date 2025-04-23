import { type IDoc, type INewDoc } from '@/models/Doc';
import { groupByTU } from '@/utils/groupByTradeUnion';
import {
  Box,
  Divider,
  Grid2,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Popover,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import s from './table.module.scss';
import { statusColor } from '@/utils/statusColor';
import { type INewProt } from '@/models/Protocol';
import { Icon } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { deleteDoc } from '@/services/getDocs';
import { useQueryClient } from '@tanstack/react-query';

interface ITableProps {
  docs: IDoc[] | INewProt[] | INewDoc[] | undefined;
  isDrafts?: boolean;
}

const Table: FC<ITableProps> = ({ docs, isDrafts }) => {
  const groupedDocs = docs ? groupByTU(docs) : [];
  const router = useRouter();
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

  const handleMenuShow = (doc: IDoc | INewDoc | INewProt) => {
    handleMenuClose();
    router.push(
      'folder' in doc && doc.folder === 'drafts'
        ? `/documents/drafts/${doc.guid}`
        : `/documents/${doc.guid}`,
    );
  };

  const handleMenuEdit = (doc: IDoc | INewDoc | INewProt) => {
    handleMenuClose();
    router.push(`/documents/drafts/${doc.guid}`);
  };
  const queryClient = useQueryClient();

  const handleMenuDelete = (doc: IDoc | INewDoc | INewProt) => {
    handleMenuClose();
    deleteDoc(doc.guid);
    queryClient.invalidateQueries({ queryKey: ['docs'] });
  };

  return (
    <Paper sx={{ p: 0, pb: 1.6 }}>
      <Grid2 container sx={{ p: 1.6 }}>
        <Grid2 size={2.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Организация
          </Typography>
        </Grid2>
        <Grid2 size={3}>
          <Typography
            variant="body2"
            fontWeight={700}
            textTransform={'uppercase'}
          >
            Документ
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Номер
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Дата
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Статус
          </Typography>
        </Grid2>
        <Grid2 size={1.5}>
          <Typography
            variant="body2"
            textTransform={'uppercase'}
            fontWeight={700}
            textAlign={'center'}
          >
            Связь
          </Typography>
        </Grid2>
      </Grid2>
      <Divider></Divider>
      {groupedDocs && !!groupedDocs.length ? (
        groupedDocs.map((el, index, arr) => (
          <Box key={el.tradeunion + index}>
            <Grid2 container sx={{ p: 1.6 }}>
              <Grid2 size={2.5}>
                <Typography variant="body2" fontWeight={700} pt={2.4}>
                  {el.tradeunion}
                </Typography>
              </Grid2>
              <Grid2 size={9} position={'relative'}>
                {el &&
                  el.docs &&
                  el.docs.map((doc, id, array) => (
                    <Box
                      key={doc.guid}
                      className={doc.status === 'NEW' ? s.hoverBold : s.hover}
                    >
                      <Grid2 container sx={{ py: 2.4 }}>
                        <Link
                          href={
                            'folder' in doc && doc.folder === 'drafts'
                              ? `/documents/drafts/${doc.guid}`
                              : `/documents/${doc.guid}`
                          }
                          style={{ width: '100%', display: 'flex' }}
                        >
                          <Grid2 size={4}>
                            <Typography
                              variant="body2"
                              fontWeight={doc.status === 'NEW' ? 700 : 600}
                            >
                              {doc.documentType === 'AM'
                                ? 'Заявление на вступление'
                                : doc.documentType === 'AG'
                                  ? 'Повестка'
                                  : doc.documentType === 'PR'
                                    ? 'Протокол'
                                    : doc.documentType}
                            </Typography>
                          </Grid2>
                          <Grid2 size={2}>
                            <Typography
                              variant="body2"
                              fontWeight={doc.status === 'NEW' ? 700 : 600}
                              textAlign={'center'}
                            >
                              {doc.documentNumber}
                            </Typography>
                          </Grid2>
                          <Grid2 size={2}>
                            <Typography
                              variant="body2"
                              fontWeight={doc.status === 'NEW' ? 700 : 600}
                              textAlign={'center'}
                            >
                              {doc.documentDate}
                            </Typography>
                          </Grid2>
                          <Grid2 size={2}>
                            <Typography
                              variant="body2"
                              fontWeight={doc.status === 'NEW' ? 700 : 600}
                              textAlign={'center'}
                            >
                              <span
                                className={s.statusBadge}
                                style={{
                                  backgroundColor: statusColor(doc.step),
                                }}
                              ></span>
                              {doc.step}
                            </Typography>
                          </Grid2>
                          <Grid2
                            size={2}
                            display={'flex'}
                            justifyContent={'center'}
                          >
                            {doc.data &&
                              'guid' in doc.data &&
                              doc?.data?.guid && (
                                <Link href={`/documents/${doc?.data?.guid}`}>
                                  <Typography
                                    variant="body2"
                                    fontWeight={
                                      doc.status === 'NEW' ? 700 : 600
                                    }
                                    sx={{ textDecoration: 'underline' }}
                                  >
                                    Повестка
                                  </Typography>
                                </Link>
                              )}
                          </Grid2>
                        </Link>
                        {isDrafts && (
                          <Grid2 position={'absolute'} top={5.5} right={-56}>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleMenuOpen(e, index);
                              }}
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
                              <MenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuShow(doc);
                                }}
                              >
                                <ListItemIcon>
                                  <Icon name="eye-on" />
                                </ListItemIcon>
                                <ListItemText>Посмотреть</ListItemText>
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuEdit(doc);
                                }}
                              >
                                <ListItemIcon>
                                  <Icon name="edit" />
                                </ListItemIcon>
                                <ListItemText>Редактировать</ListItemText>
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuDelete(doc);
                                }}
                              >
                                <ListItemIcon>
                                  <Icon name="delete" color="red" />
                                </ListItemIcon>
                                <ListItemText>Удалить</ListItemText>
                              </MenuItem>
                            </Popover>
                          </Grid2>
                        )}
                      </Grid2>

                      {id !== array.length - 1 && <Divider></Divider>}
                    </Box>
                  ))}
              </Grid2>
            </Grid2>
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

export default Table;
