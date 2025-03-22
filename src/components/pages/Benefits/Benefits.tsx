'use client';

import React, { Suspense, useMemo } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Slider from 'react-slick';

import { SliderArrowNext, SliderArrowPrev } from '@/components/ui';
import {
  BenefitsCategory,
  BenefitsProduct,
  BenefitsStat,
} from '@/components/sections/Benefits';
import { IBenefitsCategory } from '@/models/Benefits';

import useScreen from '@/hooks/useScreen';
import { useQuery } from '@tanstack/react-query';
import {
  getBenefitsCategories,
  useFetchBenefitsProducts,
} from '@/services/benefits';

const KEY_PARAM_CATEGORY = 'category';

const SLIDER_SETTINGS = {
  infinite: true,
  speed: 500,
  //slidesToShow: 6,
  slidesToScroll: 1,
  swipeToSlide: true,
  prevArrow: <SliderArrowPrev />,
  nextArrow: <SliderArrowNext />,
};

const BenefitsWrapper = () => {
  const params = useSearchParams();
  const router = useRouter();
  const screen = useScreen();

  const categoryActive = useMemo(() => {
    const param = params?.get(KEY_PARAM_CATEGORY);
    return param ? parseInt(param) : null;
  }, [params]);

  const {
    data: { data: products, isFetching, hasMore, empty },
    actions: { loadMore },
  } = useFetchBenefitsProducts({
    category: categoryActive,
  });

  const { data: categories } = useQuery({
    queryKey: ['benefits-categories'],
    queryFn: getBenefitsCategories,
    select: (data) => data.data.data,
  });

  const category: IBenefitsCategory | null = useMemo(() => {
    if (categories)
      return (
        categories.find((el: IBenefitsCategory) => el.id == categoryActive) ??
        null
      );
  }, [categories, categoryActive]);

  const handleClickCategory = (data: IBenefitsCategory) => {
    // unselect !?
    if (data.id == category?.id) {
      router.push(`${window.location.pathname}`);
      return;
    }

    router.push(`${window.location.pathname}?${KEY_PARAM_CATEGORY}=${data.id}`);
  };

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
              flex: screen == 'mobile' ? '100%' : '30%',
              maxWidth: screen == 'mobile' ? '100%' : 'calc(50% - 7px)',
            }}
            value={12}
            icon="benefits-coin"
            color="#FEC53D"
          />
          <BenefitsStat
            name="Льгот получено"
            sx={{
              flex: screen == 'mobile' ? '100%' : '30%',
              maxWidth: screen == 'mobile' ? '100%' : 'calc(50% - 7px)',
            }}
            value={2}
            icon="benefits-gift"
            color="#5CC382"
          />
          <BenefitsStat
            name="Текущая экономия"
            sx={{
              flex: screen == 'mobile' ? '100%' : '30%',
              maxWidth: screen == 'mobile' ? '100%' : 'calc(50% - 7px)',
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
          marginTop={14}
        >
          <Box position="absolute" width="100%" paddingX={3} top={-140}>
            {categories && (
              <Slider
                {...SLIDER_SETTINGS}
                slidesToShow={
                  screen == 'mobile' ? 2 : screen == 'tablet' ? 3 : 5
                }
                initialSlide={categories.findIndex(
                  (el: IBenefitsCategory) =>
                    el.id == (params?.get(KEY_PARAM_CATEGORY) || -1),
                )}
              >
                {categories.map((el: IBenefitsCategory) => (
                  <Box key={el.id} paddingX={0.5}>
                    <BenefitsCategory
                      sx={{
                        height: '125px',
                        width: '100%',
                      }}
                      data={el}
                      active={el.id == category?.id}
                      onClick={handleClickCategory}
                    />
                  </Box>
                ))}
              </Slider>
            )}
          </Box>

          {products.map((el) => (
            <Link
              key={el.id}
              href={`/benefits/product/${el.id}`}
              target="_blank"
              style={{
                display: 'flex',
                flex:
                  screen == 'mobile'
                    ? '100%'
                    : screen == 'tablet'
                      ? 'calc(50% - 8px)'
                      : 'calc(33% - 8px)',
                maxWidth:
                  screen == 'mobile'
                    ? '100%'
                    : screen == 'tablet'
                      ? 'calc(50% - 8px)'
                      : 'calc(33% - 8px)',
                width: '100%',
              }}
            >
              <BenefitsProduct data={el} active={el.id == category?.id} />
            </Link>
          ))}

          {isFetching && (
            <Box display={'flex'} justifyContent={'center'} width={'100%'}>
              <CircularProgress />
            </Box>
          )}
        </Box>

        {!isFetching && hasMore && (
          <Button variant="text" onClick={loadMore}>
            Показать ещё
          </Button>
        )}

        {!isFetching && empty && (
          <Typography fontSize={16} fontWeight="bold" align="center">
            Нет данных
          </Typography>
        )}
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
