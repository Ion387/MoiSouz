import { getBackendUrl } from '@/constants/url';
import { IDoc, INewDoc } from '@/models/Doc';
import { INewProtocol } from '@/models/Protocol';
import { getHeaders } from '@/utils/axios';
import axios from 'axios';

export const getDocs = async () => {
  const response = await axios.get(`${getBackendUrl}/api/private/documents`, {
    headers: { ...(await getHeaders()) },
  });

  return response;
};

export const getDoc = async <T extends IDoc | INewDoc | INewProtocol>(
  guid: string | undefined,
): Promise<T | null> => {
  if (guid) {
    const response = await axios.get<T>(
      `${getBackendUrl}/api/private/document/${guid}`,
      {
        headers: { ...(await getHeaders()) },
      },
    );
    return response.data;
  } else {
    return null;
  }
};
