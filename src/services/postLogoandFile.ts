import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveFormTULogo = async (file: any) => {
  if (typeof file != 'object') {
    return null;
  }

  const formData = new FormData();
  formData.append('logo', file);

  return axios.post(`${getBackendUrl}/api/private/tradeunion-logo`, formData, {
    headers: {
      ...(await getHeaders()),
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveFormTUScan = async (file: any) => {
  if (typeof file != 'object') {
    return null;
  }

  const formData = new FormData();
  formData.append('scan', file);

  return axios.post(`${getBackendUrl}/api/private/tradeunion-scan`, formData, {
    headers: {
      ...(await getHeaders()),
    },
  });
};
