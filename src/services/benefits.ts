'use client';

import { getBackendUrl } from '@/constants/url';
import { IBenefitsProduct } from '@/models/Benefits';
import { getHeaders } from '@/utils/axios';
import axios from 'axios';
import { useFetchList } from './universal/fetch-list';

interface PropsUseFetchBenefitsProducts {
  perPage?: number;
  category?: number | null;
  search?: string | null;
  city?: number | string | null;
}
export const useFetchBenefitsProducts = ({
  perPage,
  category,
  search,
  city,
}: PropsUseFetchBenefitsProducts) => {
  return useFetchList<IBenefitsProduct>({
    name: 'benefits-products',
    api: '/api/private/discounts',
    params: {
      itemsPerPage: perPage,
      category: category || null,
      q: search || null,
      city: city || null,
    },
    type: 'page',
    hasMore: (meta) => meta.current_page < meta.last_page,
    getTotal: (meta) => meta.total,
  });
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

export const getBenefitsProductPromo = async (id: string) => {
  const response = await axios.get(
    `${getBackendUrl}/api/private/discount/${id}/promo`,
    {
      headers: { ...(await getHeaders()) },
    },
  );

  return response;
};

export const getBenefitsProductPromos = async () => {
  const response = await axios.get(`${getBackendUrl}/api/private/promos`, {
    headers: { ...(await getHeaders()) },
  });

  return response;
};
