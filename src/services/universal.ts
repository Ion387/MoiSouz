'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';

export type TypeUseFetchList = 'infinity' | 'page';

interface PropsUseFetchList {
  name: string;
  api: string;
  /** Default is infinity */
  type?: TypeUseFetchList;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasMore?: (meta: any) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTotal?: (meta: any) => number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: { [key: string]: any };
}
export const useFetchList = <T>({
  name,
  api,
  type = 'infinity',
  params = {},
  hasMore,
  getTotal,
}: PropsUseFetchList) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getPageFromQuery = () => {
    const _params = new URLSearchParams(searchParams.toString());
    return parseInt(_params.get('page') || '1');
  };

  const [result, setResult] = useState<{
    page: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: { [key: string]: any };
    hasMore: boolean;
    total: number;
    data: T[];
  }>({ page: getPageFromQuery(), params, hasMore: false, total: 0, data: [] });

  const { data, isFetching, refetch } = useQuery({
    queryKey: [name, result.page, JSON.stringify(result.params)],
    queryFn: async () =>
      await getList({
        api,
        page: result.page,
        params,
      }),
    select: (data) => data.data,
  });

  // save params to query
  useEffect(() => {
    const from = searchParams.toString();
    const _params = new URLSearchParams(searchParams.toString());

    _params.set('page', String(result.page));

    const to = _params.toString();
    if (from == to) return;
    router.push(`?${to}`);
  }, [result.page, params]);

  useEffect(() => {
    if (data == null) return;

    if (JSON.stringify(result.params) != JSON.stringify(params)) {
      setResult({
        page: getPageFromQuery(),
        params,
        data: [],
        hasMore: false,
        total: 0,
      });
    } else {
      const dataNew = data.data.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el: T | any) => !result.data.some((el2: any) => el.id == el2.id),
      );
      if (dataNew.length > 0) {
        setResult({
          ...result,
          data:
            type == 'infinity' ? [...result.data, ...dataNew] : [...dataNew],
          hasMore: hasMore
            ? hasMore(data.meta)
            : data.meta.currentPage * data.meta.itemsPerPage <
              data.meta.totalItems,
          total: getTotal ? getTotal(data?.meta || {}) : data?.meta.totalItems,
        });
      }
    }
  }, [result, data, params]);

  const loadPrev = () => {
    if (result == null) return;
    setResult({
      ...result,
      page: result.page ? Math.max(1, result.page - 1) : 1,
    });
  };

  const loadNext = () => {
    if (result == null) return;
    setResult({
      ...result,
      page: result.page ? result.page + 1 : 1,
    });
  };

  return {
    data: {
      data: result.data || [],
      isFetching,
      page: result.page,
      total: result.total,
      hasMore: result.hasMore,
      empty: result.total == 0,
    },
    actions: {
      loadPrev,
      loadNext,
      refetch,
    },
  };
};

interface PropsGetList {
  api?: string;
  page?: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: { [key: string]: any };
}
const getList = async ({ api, page, params }: PropsGetList = {}) => {
  const response = await axios.get(`${getBackendUrl}${api}`, {
    headers: { ...(await getHeaders()) },
    params: { page, ...params },
  });

  return response;
};
