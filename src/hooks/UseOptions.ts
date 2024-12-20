import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBackendUrl } from '@/constants/url';
import { getSession } from 'next-auth/react';
import { IOptionsResponse } from '@/models/Option';

const getOptions = async () => {
  const session = await getSession();

  return axios.get<IOptionsResponse>(`${getBackendUrl}/api/hobbies`, {
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  });
};

export const useOptions = ({ name }: { name: string }) => {
  const { data } = useQuery({
    queryKey: [`options/${name}`],
    queryFn: () => getOptions(),
    select: (data) => data.data,
  });

  return { data };
};
