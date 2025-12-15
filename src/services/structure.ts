import axios from 'axios';
import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';

export const postOwner = async (email: string, password: string) => {
  if (email && password)
    return axios.post(
      `${getBackendUrl}/api/private/orgstructure/owner`,
      { email: email, password: password },
      {
        headers: {
          ...(await getHeaders()),
        },
      },
    );
};

export const postTradeunion = async (data: unknown) => {
  return axios.post(
    `${getBackendUrl}/api/private/orgstructure/tradeunion`,
    data,
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};
