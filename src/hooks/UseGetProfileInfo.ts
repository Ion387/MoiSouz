import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getBackendUrl } from '@/constants/url';
import { getSession } from 'next-auth/react';
import { IProfile } from '@/models/Profile';

const getProfileData = async () => {
  const session = await getSession();

  return axios.get<IProfile>(`${getBackendUrl}/api/private/profile`, {
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  });
};

export function useGetProfileInfo() {
  const { data } = useQuery({
    queryKey: ['profileInfo'],
    queryFn: () => getProfileData(),
    select: (data) => data.data,
  });

  return { profileInfo: data };
}
