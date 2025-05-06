import { getBackendUrl } from '@/constants/url';
import { IBenefitsProduct } from '@/models/Benefits';
import { getHeaders } from '@/utils/axios';
import axios from 'axios';
import { useFetchList } from './universal';

interface PropsUseFetchBenefitsProducts {
  category?: number | null;
}
export const useFetchBenefitsProducts = ({
  category,
}: PropsUseFetchBenefitsProducts) => {
  return useFetchList<IBenefitsProduct>({
    name: 'benefits-products',
    api: '/api/private/discounts',
    params: {
      category,
    },
    hasMore: (meta) => meta.current_page < meta.last_page,
    hasAny: (meta) => meta.total == 0,
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
