import { getHeaders } from '@/utils/axios';
import axios from 'axios';

export const BENEFITS_URL = 'https://bestbenefits.ru';

export const getBenefitsCategories = async () => {
  const response = await axios.get(`${BENEFITS_URL}/api/categories`, {
    headers: { ...(await getHeaders()) },
  });

  return response;
};
