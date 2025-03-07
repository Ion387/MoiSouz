'use client';

import React, { createRef, Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import {
  BenefitsCategory,
  BenefitsProduct,
  BenefitsStat,
} from '@/components/sections/Benefits';
import { IBenefitsCategory, IBenefitsProduct } from '@/models/Benefits';
import useMobile from '@/hooks/UseMobile';
import Link from 'next/link';
import {
  getBenefitsCategories,
  getBenefitsProducts,
} from '@/services/benefits';
import { useQuery } from '@tanstack/react-query';

const KEY_PARAM_CATEGORY = 'category';

const BenefitsWrapper = () => {
  const params = useSearchParams();
  const router = useRouter();
  const refCategories = createRef<HTMLDivElement>();
  const mobile = useMobile();

  const { data, isFetching } = useQuery({
    queryKey: ['benefits-products'],
    queryFn: getBenefitsProducts,
    select: (data) => data.data.data,
  });

  const { data: BENEFITS_CATEGORIES } = useQuery({
    queryKey: ['benefits-categories'],
    queryFn: getBenefitsCategories,
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (refCategories.current == null) return;
    const abort = new AbortController();
    refCategories.current.addEventListener(
      'wheel',
      function (event) {
        event.preventDefault();
        this.scrollLeft += event.deltaY / 2;
      },
      { signal: abort.signal },
    );
    return () => abort.abort();
  }, [refCategories.current, data]);

  const category: IBenefitsCategory | null = useMemo(() => {
    if (BENEFITS_CATEGORIES)
      return (
        BENEFITS_CATEGORIES.find(
          (el: IBenefitsCategory) =>
            el.id == (params?.get(KEY_PARAM_CATEGORY) ?? -1),
        ) ?? null
      );
  }, [BENEFITS_CATEGORIES, params]);

  const products: IBenefitsProduct[] = useMemo(() => {
    if (!isFetching) {
      return category == null
        ? data
        : data.filter(
            (el: IBenefitsProduct) => el.main_category?.id == category.id,
            //el.categories.some((el2) => el2.id == category.id),
          );
    } else return [];
  }, [data, category, isFetching]);

  const handleClickCategory = (data: IBenefitsCategory) => {
    // unselect !?
    if (data.id == category?.id) {
      router.push(`${window.location.pathname}`);
      return;
    }

    router.push(`${window.location.pathname}?${KEY_PARAM_CATEGORY}=${data.id}`);
  };

  useEffect(() => {
    console.log('products', products);
  }, [products]);
  return (
    <>
      <Box display="flex" flexDirection="column" gap={1.5} marginTop={3}>
        <Typography variant="h3" marginBottom={2}>
          Скидки и льготы
        </Typography>
        <Box display="none" flexWrap="wrap" gap={1.5}>
          <BenefitsStat
            name="Скидок получено"
            sx={{
              flex: mobile ? '100%' : '30%',
              maxWidth: mobile ? '100%' : 'calc(50% - 7px)',
            }}
            value={12}
            icon="benefits-coin"
            color="#FEC53D"
          />
          <BenefitsStat
            name="Льгот получено"
            sx={{
              flex: mobile ? '100%' : '30%',
              maxWidth: mobile ? '100%' : 'calc(50% - 7px)',
            }}
            value={2}
            icon="benefits-gift"
            color="#5CC382"
          />
          <BenefitsStat
            name="Текущая экономия"
            sx={{
              flex: mobile ? '100%' : '30%',
              maxWidth: mobile ? '100%' : 'calc(50% - 7px)',
            }}
            value="700₽"
            icon="benefits-chart"
            color="#4AD991"
          />
        </Box>

        <Box
          position="relative"
          display="flex"
          flexWrap="wrap"
          width="100%"
          gap={1.5}
          marginTop={10}
        >
          <Box
            ref={refCategories}
            display="flex"
            width="100%"
            gap={1.5}
            position="absolute"
            top={-116}
            overflow="auto"
            sx={{
              scrollbarWidth: 'none',
            }}
          >
            {BENEFITS_CATEGORIES ? (
              BENEFITS_CATEGORIES.map((el: IBenefitsCategory) => (
                <BenefitsCategory
                  key={el.id}
                  data={el}
                  active={el.id == category?.id}
                  onClick={handleClickCategory}
                />
              ))
            ) : (
              <Box display={'flex'} justifyContent={'center'} width={'100%'}>
                <CircularProgress />
              </Box>
            )}
          </Box>

          {isFetching ? (
            <Box display={'flex'} justifyContent={'center'} width={'100%'}>
              <CircularProgress />
            </Box>
          ) : (
            products.map((el) => (
              <Link
                key={el.id}
                href={`/benefits/product/${el.id}`}
                style={{
                  display: 'flex',
                  flex: mobile ? '100%' : '40%',
                  maxWidth: mobile ? '100%' : 'calc(50% - 8px)',
                  width: '100%',
                }}
              >
                <BenefitsProduct data={el} active={el.id == category?.id} />
              </Link>
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

const BenefitsPage = () => {
  return (
    <Suspense>
      <BenefitsWrapper />
    </Suspense>
  );
};

export default BenefitsPage;
