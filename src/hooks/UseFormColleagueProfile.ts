import axios, { AxiosError } from 'axios';

import { getHeaders } from '@/utils/axios';

import { getBackendUrl } from '@/constants/url';
import { IFormColleagueProfile } from '@/models/Colleague';
import { useRouter } from 'next/navigation';
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useForm = () => {
  const router = useRouter();

  const onCancel = () => {
    router.push('/colleagues');
  };

  const mutationKey = 'colleague-profile';
  const { mutate, isSuccess, error } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data: IFormColleagueProfile) => {
      try {
        if (data.guid) await saveFormColleagueProfile(data);
        else await addFormColleagueProfile(data);
      } catch (err) {
        const error = err as AxiosError<{
          status: string;
          description: string;
        }>;
        if (
          error.response?.data?.description?.startsWith(
            'Пользователь с эл. почтой',
          )
        ) {
          throw new Error('email');
        }
        throw new Error('email');
      }
      console.log('REASON FILE', data.reasonFile);
    },
    onSuccess: () => {
      router.push('/colleagues');
    },
  });

  const isMutation = useIsMutating({ mutationKey: [mutationKey] });

  const onSubmit: (data: IFormColleagueProfile) => Promise<void> = async (
    data,
  ) => mutate(data);

  return { onCancel, onSubmit, isSuccess, isLoading: isMutation > 0, error };
};

export const useFetchColleagueProfile = (guid: string) => {
  const queryClient = useQueryClient();
  const queryKey = `colleague-profile-${guid}`;

  const {
    data: info,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () =>
      axios.get<IFormColleagueProfile>(
        `${getBackendUrl}/api/private/tradeunion-user/${guid}`,
        {
          headers: {
            ...(await getHeaders()),
          },
        },
      ),
    select: (data) => data.data,
    refetchOnMount: 'always',
  });
  const clear = () => queryClient.removeQueries({ queryKey: [queryKey] });
  return { data: info, isLoading, refetch, clear };
};

export const addFormColleagueProfile = async (data: IFormColleagueProfile) => {
  return axios.post<IFormColleagueProfile>(
    `${getBackendUrl}/api/private/tradeunion-user`,
    data,
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};

export const saveFormColleagueProfile = async (data: IFormColleagueProfile) => {
  return axios.put<IFormColleagueProfile>(
    `${getBackendUrl}/api/private/tradeunion-user/${data.guid}`,
    data,
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};
