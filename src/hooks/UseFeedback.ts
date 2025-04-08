import axios from 'axios';

import { getHeaders } from '@/utils/axios';

import { getBackendUrl } from '@/constants/url';
import { IFormFeedback } from '@/models/Forms';

export const saveFormFeedback = async (data: IFormFeedback) => {
  return axios.post<{ description: string; status: string }>(
    `${getBackendUrl}/api/private/feedback`,
    data,
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};
