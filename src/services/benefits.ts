import { getBackendUrl } from '@/constants/url';
import { IBenefitsProduct } from '@/models/Benefits';
import { getHeaders } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface PropsGetBenefitsProducts {
  page?: number | null;
  category?: number | null;
}
export const getBenefitsProducts = async ({
  page,
  category,
}: PropsGetBenefitsProducts = {}) => {
  const response = await axios.get(`${getBackendUrl}/api/private/discounts`, {
    headers: { ...(await getHeaders()) },
    params: { page, category },
  });

  return response;
};

interface PropsUseFetchBenefitsProducts {
  category?: number | null;
}
export const useFetchBenefitsProducts = ({
  category,
}: PropsUseFetchBenefitsProducts) => {
  const [result, setResult] = useState<{
    page: number;
    category?: number | null;
    hasMore: boolean;
    data: IBenefitsProduct[];
  }>({ page: 1, category, hasMore: false, data: [] });

  const { data, isFetching } = useQuery({
    queryKey: ['benefits-products', result.page, result.category],
    queryFn: async () =>
      await getBenefitsProducts({
        page: result.page,
        category: result.category,
      }),
    select: (data) => data.data,
  });

  useEffect(() => {
    if (data == null) return;

    if (result.category != category) {
      setResult({
        page: 1,
        category,
        data: [],
        hasMore: false,
      });
    } else {
      const dataNew = data.data.filter(
        (el: IBenefitsProduct) => !result.data.some((el2) => el.id == el2.id),
      );
      if (dataNew.length > 0) {
        setResult({
          ...result,
          data: [...result.data, ...dataNew],
          hasMore: data.meta.current_page < data.meta.last_page,
        });
      }
    }
  }, [result, data, category]);

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
      empty: data?.meta.total == 0,
    },
    actions: {
      loadMore,
    },
  };
};

export const getBenefitsProduct = async (id: string) => {
  const response = await axios.get(
    `${getBackendUrl}/api/private/discount/${id}`,
    {
      headers: { ...(await getHeaders()) },
    },
  );

  return response;
};

export const getBenefitsCategories = async () => {
  const response = await axios.get(
    `${getBackendUrl}/api/private/discount_categories`,
    {
      headers: { ...(await getHeaders()) },
    },
  );

  return response;
};
