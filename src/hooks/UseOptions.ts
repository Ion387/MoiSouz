import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBackendUrl } from '@/constants/url';
import { getSession } from 'next-auth/react';
import { IOptionsResponse } from '@/models/Option';

const NAMES = ['hobbies'] as const;
export type OptionName = (typeof NAMES)[number];

const getOptions = async ({ name }: { name: OptionName }) => {
  const session = await getSession();

  return axios.get<IOptionsResponse>(`${getBackendUrl}/api/${name}`, {
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  });
};

export const useOptions = ({ name }: { name: OptionName }) => {
  const { data } = useQuery({
    queryKey: [`options/${name}`],
    queryFn: () => getOptions({ name }),
    select: (data) => data.data,
  });

  return { data };
};
