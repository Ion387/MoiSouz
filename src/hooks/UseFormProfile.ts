import axios from 'axios';

import { getHeaders } from '@/utils/axios';

import { getBackendUrl } from '@/constants/url';
import { IFormProfile } from '@/models/Forms';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useForm = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const onCancel = () => {
    router.push('/main');
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (data: IFormProfile) => {
      saveFormProfileAvatar(data.avatar);
      saveFormProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const onSubmit: (data: IFormProfile) => Promise<void> = async (data) =>
    mutate(data);

  return { onCancel, onSubmit, isSuccess };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
