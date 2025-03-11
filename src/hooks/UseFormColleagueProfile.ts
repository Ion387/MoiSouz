import axios from 'axios';

import { getHeaders } from '@/utils/axios';

import { getBackendUrl } from '@/constants/url';
import { IFormColleagueProfile } from '@/models/Colleague';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

export const useForm = () => {
  const router = useRouter();

  const onCancel = () => {
    router.push('/colleagues');
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: IFormColleagueProfile) => {
      console.log(data);
      //saveFormProfile(data);
    },
    onSuccess: () => {
      router.push('/colleagues');
    },
  });

  const onSubmit: (data: IFormColleagueProfile) => Promise<void> = async (
    data,
  ) => mutate(data);

  return { onCancel, onSubmit, isSuccess };
};

export const saveFormColleagueProfile = async (data: IFormColleagueProfile) => {
  return axios.post<IFormColleagueProfile>(
    `${getBackendUrl}/api/private/profile-colleague`,
    data,
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};
