import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';

interface PropsUseFetchList {
  name: string;
  api: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasMore?: (meta: any) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasAny?: (meta: any) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: { [key: string]: any };
}
export const useFetchList = <T>({
  name,
  api,
  params = {},
  hasMore,
  hasAny,
}: PropsUseFetchList) => {
  const [result, setResult] = useState<{
    page: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: { [key: string]: any };
    hasMore: boolean;
    data: T[];
  }>({ page: 1, params, hasMore: false, data: [] });

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

  useEffect(() => {
    if (data == null) return;

    if (JSON.stringify(result.params) != JSON.stringify(params)) {
      setResult({
        page: 1,
        params,
        data: [],
        hasMore: false,
      });
    } else {
      const dataNew = data.data.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el: T | any) => !result.data.some((el2: any) => el.id == el2.id),
      );
      if (dataNew.length > 0) {
        setResult({
          ...result,
          data: [...result.data, ...dataNew],
          hasMore: hasMore
            ? hasMore(data.meta)
            : data.meta.currentPage * data.meta.itemsPerPage <
              data.meta.totalItems,
        });
      }
    }
  }, [result, data, params]);

  const loadMore = () => {
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
      hasMore: result.hasMore,
      empty: hasAny ? hasAny(data?.meta || {}) : data?.meta.totalItems == 0,
    },
    actions: {
      loadMore,
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
