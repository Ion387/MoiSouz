'use client';

import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  IconButton,
  Box,
  Collapse,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Icon } from '@/components/ui';
import { useFetchTUOwner } from '@/hooks/useTU';
import { isChildOf } from '@/hooks/UseTree';

// Типы для данных
interface OrganizationNode {
  id: number;
  guid: string;
  title: string;
  type: number | null;
  children: OrganizationNode[] | null;
  selected: boolean;
  editable: boolean;
}

interface TreeTableProps {
  data: OrganizationNode[];
  disabled?: boolean;
}

const getTypeName = (type: number | null): string => {
  switch (type) {
    case 1:
      return 'Федеральная ПО';
    case 2:
      return 'Региональная организация';
    case 3:
      return 'Территориальная организация';
    case 4:
      return 'Первичная профсоюзная организация';
    case 4:
      return 'Первичная профсоюзная организация без ИНН';
    default:
      return 'Не указан';
  }
};

const TreeTableRow: React.FC<{
  node: OrganizationNode;
  level?: number;
  data?: OrganizationNode[];
}> = ({ node, level = 0, data }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const childrenCount = node.children?.length || 0;
  const tuOwner = useFetchTUOwner();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (tuOwner && data) {
      console.log(tuOwner.id === node.id);
      setIsActive(
        isChildOf(data, Number(tuOwner?.id), node.id) || tuOwner.id === node.id,
      );
    }
  }, [tuOwner, data, node]);

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: node.id !== tuOwner?.id ? 'inherit' : '#4880ff0d',
          border: 'none',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        <TableCell
          sx={{
            paddingLeft: level * 4 || '20px',
            width: '54.2%',
            borderRight: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Box
            sx={{ display: 'flex', alignItems: 'center', minHeight: '40px' }}
          >
            {hasChildren && (
              <IconButton
                size="small"
                onClick={() => setOpen(!open)}
                sx={{
                  marginRight: 1,
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  color: 'primary.main',
                }}
              >
                <Icon name="arrow-dropdown" />
              </IconButton>
            )}
            {!hasChildren && level > 0 && (
              <Box
                sx={{ width: 40, display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    opacity: 1,
                  }}
                />
              </Box>
            )}

            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                flexGrow: 1,
                paddingLeft: level === 0 ? 0 : 1,
              }}
            >
              {node.title}
            </Typography>
          </Box>
        </TableCell>

        {/* Столбец с типом */}
        <TableCell
          sx={{
            width: '20.8%',
            borderRight: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign={'center'}
          >
            {getTypeName(node.type)}
          </Typography>
        </TableCell>

        {/* Столбец с количеством дочерних элементов */}
        <TableCell
          sx={{
            width: '14.7%',
            borderRight: '1px solid rgba(224, 224, 224, 0.5)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {childrenCount > 0 ? (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 24,
                  height: 24,
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  borderRadius: '12px',
                  padding: '0 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {childrenCount}
              </Box>
            ) : (
              <Typography variant="caption" color="text.disabled">
                нет
              </Typography>
            )}
          </Box>
        </TableCell>

        {/* Столбец с действиями */}
        <TableCell sx={{ width: '10.3%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            {isActive && (
              <IconButton
                size="small"
                sx={{
                  color: node.selected ? 'primary.main' : 'action.active',
                }}
              >
                <Icon name={'menu'} />
              </IconButton>
            )}
          </Box>
        </TableCell>
      </TableRow>

      {/* Дочерние элементы - только для столбца с названием */}
      {hasChildren && (
        <TableRow>
          <TableCell
            style={{
              padding: 0,
              borderRight: '1px solid rgba(224, 224, 224, 0.5)',
            }}
            colSpan={4}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ position: 'relative' }}>
                {/* Вертикальная линия для связи с родителем */}
                {open && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 20 + level * 24,
                      top: 0,
                      bottom: 0,
                      width: '1px',
                      backgroundColor: 'divider',
                      zIndex: 1,
                    }}
                  />
                )}
                <Box sx={{ marginLeft: 0 }}>
                  <Table size="small" sx={{ border: 'none' }}>
                    <TableBody sx={{ border: 'none' }}>
                      {node.children!.map((child) => (
                        <TreeTableRow
                          key={child.id}
                          node={child}
                          level={level + 1}
                          data={data}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export const TreeTable: React.FC<TreeTableProps> = ({
  data,
  disabled = false,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        pointerEvents: disabled ? 'none' : 'auto',
        opacity: disabled ? 0.7 : 1,
        overflow: 'hidden',
      }}
    >
      {/* Заголовки таблицы */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid container alignItems="center">
          {/* Название */}
          <Grid size={6.5}>
            <Typography
              variant="body2"
              fontWeight={700}
              textTransform={'uppercase'}
            >
              Название организации
            </Typography>
          </Grid>

          {/* Тип */}
          <Grid size={2.5}>
            <Typography
              variant="body2"
              fontWeight={700}
              textTransform={'uppercase'}
              textAlign={'center'}
            >
              Тип
            </Typography>
          </Grid>

          {/* Дочерние элементы */}
          <Grid size={2}>
            <Typography
              variant="body2"
              fontWeight={700}
              textTransform={'uppercase'}
              textAlign={'center'}
            >
              Подразделения
            </Typography>
          </Grid>

          {/* Действия */}
          <Grid size={1}>
            <Typography
              variant="body2"
              fontWeight={700}
              textTransform={'uppercase'}
              textAlign={'center'}
            >
              Действия
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Тело таблицы */}
      <TableContainer>
        <Table
          sx={{
            borderCollapse: 'separate',
            borderSpacing: 0,
          }}
        >
          <TableBody>
            {data.length > 0 ? (
              data.map((node, index) => (
                <React.Fragment key={node.id}>
                  <TreeTableRow node={node} data={data} />
                  {/* Разделитель между корневыми элементами */}
                  {index < data.length - 1 && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          height: 1,
                          p: 0,
                        }}
                      />
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: 200,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      Здесь пока пусто
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
