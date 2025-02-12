import { getBackendUrl } from '@/constants/url';
import { IDoc } from '@/models/Doc';
import { getHeaders } from '@/utils/axios';
import axios from 'axios';

export const getDocs = async () => {
  const response = await axios.get(`${getBackendUrl}/api/private/documents`, {
    headers: { ...(await getHeaders()) },
  });

  return response;
};

export const getDoc = async (guid: string | undefined) => {
  if (guid) {
    const response = await axios.get<IDoc>(
      `${getBackendUrl}/api/private/document/${guid}`,
      {
        headers: { ...(await getHeaders()) },
      },
    );
    return response;
  } else return null;
};
