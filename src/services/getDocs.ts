import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';
import axios from 'axios';

export const getDocs = async () => {
  const response = await axios.get(`${getBackendUrl}/api/private/documents`, {
    headers: { ...(await getHeaders()) },
  });

  return response;
};
