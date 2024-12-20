import axios from 'axios';

import { getHeaders } from '@/utils/axios';

import { getBackendUrl } from '@/constants/url';
import { IFormProfile } from '@/models/Forms';

export const saveFormProfileAvatar = async (file: any) => {
  if (typeof file != 'object') {
    return null;
  }

  const formData = new FormData();
  formData.append('avatar', file);

  return axios.post<IFormProfile>(
    `${getBackendUrl}/api/private/avatar`,
    formData,
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};

export const saveFormProfile = async (data: IFormProfile) => {
  return axios.post<IFormProfile>(
    `${getBackendUrl}/api/private/profile`,
    data,
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};
