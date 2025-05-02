import axios from 'axios';
import { getBackendUrl } from '@/constants/url';
import { getHeaders } from '@/utils/axios';
import {
  useIsMutating,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { IResponseList } from '@/models/Response';
import { IFormNews } from '@/models/News';
import { useRouter } from 'next/navigation';

interface PropsGetNewsOne {
  code?: string;
}
export const useFetchNewsOne = ({ code }: PropsGetNewsOne) => {
  const queryClient = useQueryClient();
  const queryKey = `news-one-${code}`;

  const { data: info, isLoading } = useQuery({
    queryKey: [`news-one-${code}`],
    queryFn: async () =>
      axios.get<IFormNews>(`${getBackendUrl}/api/private/news/${code}`, {
        headers: {
          ...(await getHeaders()),
        },
      }),
    select: (data) => data.data,
    refetchOnMount: 'always',
  });

  const clear = () => queryClient.removeQueries({ queryKey: [queryKey] });
  return { data: info, isLoading, clear };
};

interface PropsNewsList {
  page?: number;
  perPage?: number;
}
export const useFetchNewsList = (
  { page, perPage }: PropsNewsList = { page: 1, perPage: 30 },
) => {
  const {
    data: info,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['news-list'],
    queryFn: async () =>
      axios.get<IResponseList<IFormNews[]> | undefined>(
        `${getBackendUrl}/api/private/news?page=${page}&itemsPerPage=${perPage}`,
        {
          headers: {
            ...(await getHeaders()),
          },
        },
      ),
    select: (data) => data.data,
    refetchOnMount: 'always',
  });
  return { data: info?.data, isLoading, refetch };
};

export const useForm = () => {
  const router = useRouter();

  const onCancel = () => {
    router.push('/news');
  };

  const mutationKey = 'news-one';
  const { mutate, isSuccess, error } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data: IFormNews) => {
      try {
        if (data.code) await saveFormNews(data);
        else await addFormNews(data);
      } catch /*(err)*/ {
        /*const error = err as AxiosError<{
          status: string;
          description: string;
        }>;*/
      }
    },
    onSuccess: () => {
      router.push('/news');
    },
  });

  const isMutation = useIsMutating({ mutationKey: [mutationKey] });

  const onSubmit: (data: IFormNews) => Promise<void> = async (data) =>
    mutate(data);

  return { onCancel, onSubmit, isSuccess, isLoading: isMutation > 0, error };
};

export const addFormNews = async (data: IFormNews) => {
  return axios.post(
    `${getBackendUrl}/api/private/news`,
    generateFormData(data),
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};

export const saveFormNews = async (data: IFormNews) => {
  return axios.post(
    `${getBackendUrl}/api/private/news/${data.code}`,
    generateFormData(data),
    {
      headers: {
        ...(await getHeaders()),
      },
    },
  );
};

export const deleteFormNews = async (data: IFormNews) => {
  return axios.delete(`${getBackendUrl}/api/private/news/${data.code}`, {
    headers: {
      ...(await getHeaders()),
    },
  });
};

const generateFormData = (data: IFormNews) => {
  const formData = new FormData();

  formData.append('title', data.title);
  formData.append('preview', data.preview);
  formData.append('text', data.text);
  formData.append('date', data.date);
  formData.append('status', data.status);

  if (typeof data.image == 'object') {
    formData.append('image', data.image as Blob);
  }

  return formData;
};
