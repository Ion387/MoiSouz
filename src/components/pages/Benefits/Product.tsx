'use client';

import { useMap } from '@/hooks/useMap';
import { getBenefitsProduct } from '@/services/benefits';
import { Box, CircularProgress, Grid2, Paper, Typography } from '@mui/material';
import { useYMaps } from '@pbe/react-yandex-maps';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

const BenefitsProductPage = () => {
  const pathName = usePathname();
  const id = pathName.split('/')[3];

  const { data: product, isFetching } = useQuery({
    queryKey: ['benefit-item'],
    queryFn: () => getBenefitsProduct(id),
    select: (data) => data?.data.data,
  });
  const mapRef = useRef(null);
  const ymaps = useYMaps([
    'Map',
    'Placemark',
    'control.ZoomControl',
    'templateLayoutFactory',
  ]);
  const [selectedPlacemark, setSelectedPlacemark] = useState<null | number>(
    null,
  );

  useMap(product, ymaps, mapRef, selectedPlacemark, setSelectedPlacemark);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.description');
    function getElementByText(text: string) {
      const xpath = `//node()[normalize-space(text())='${text.trim()}']`;
      return document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;
    }
    const links = container
      ? [
          ...container.querySelectorAll<HTMLElement>('a span'),
          getElementByText('BestBenefits'),
        ]
      : [];
    if (links[links.length - 1] == null) links.pop();
    if (links.length)
      links.forEach((el) => {
        //@ts-expect-error none
        el.style.color = 'rgb(72, 128, 255)';
      });
  }, [product, id]);
  return (
    <Grid2 container spacing={1.6}>
      {!isFetching ? (
        <>
          <Grid2 size={12}>
            <Typography variant="h3" marginBottom={0}>
              {product.name}
            </Typography>
          </Grid2>
          <Grid2 size={4}>
            <Paper>
              <img
                style={{
                  width: '100%',
                  aspectRatio: '17 / 9',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
                alt={product.name}
                src={`data:image/png;base64,${product.image}`}
              />
              {!!product.cities.length && (
                <Box display={'flex'} gap={0.6} mt={1} flexWrap={'wrap'}>
                  <Box>
                    <Typography variant="h4" fontWeight={600}>
                      Города:
                    </Typography>
                  </Box>
                  {product.cities.map(
                    (
                      el: { name: string },
                      id: number,
                      arr: { name: string }[],
                    ) => {
                      if (id < arr.length - 1)
                        return <Box key={el.name}>{el.name},</Box>;
                      else return <Box key={el.name}>{el.name}</Box>;
                    },
                  )}
                </Box>
              )}
            </Paper>
          </Grid2>
          <Grid2 size={8}>
            <Paper>
              <Typography variant="h3" fontWeight={600} marginBottom="12px">
                Описание
              </Typography>
              <Box p={2}>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </Box>
              {!!product.coords.length && (
                <>
                  <Typography variant="h3" fontWeight={600} marginTop="12px">
                    Местоположение
                  </Typography>
                  <div
                    style={{
                      height: '500px',
                      width: '100%',
                      marginTop: '24px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                    }}
                    ref={mapRef}
                  ></div>
                </>
              )}
            </Paper>
          </Grid2>
        </>
      ) : (
        <Box display={'flex'} width={'100%'} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      )}
    </Grid2>
  );
};

export default BenefitsProductPage;
