import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';
import axios from 'axios';

export const getBenefitsProducts = async () => {
  const response = await axios.get(
    `${getBackendUrl}/api/private/discounts?perPage=25`,
    {
      headers: { ...(await getHeaders()) },
    },
  );

  return response;
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
