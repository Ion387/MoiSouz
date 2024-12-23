'use client';

import ProfileForm from '@/components/forms/ProfileForm';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { saveFormProfile, saveFormProfileAvatar } from '@/hooks/UseFormProfile';
import { IFormProfile } from '@/models/Forms';
import { CircularProgress } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const ProfilePage = ({ setSteps }: { setSteps?: (step: number) => void }) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const info = useFetchProfile();

  const onCancel = () => {
    router.push('/main');
  };

  const { mutate } = useMutation({
    mutationFn: async (data: IFormProfile) => {
      saveFormProfileAvatar(data.avatar);
      saveFormProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const onSubmit: (data: IFormProfile) => Promise<void> = async (data) => {
    mutate(data);
    if (setSteps) setSteps(2);
  };

  if (!info) {
    return (
      <CircularProgress
        sx={{ display: 'flex', mx: 'auto', mt: '50px' }}
        color="primary"
        size={40}
      />
    );
  }

  return (
    <ProfileForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      loading={!info}
      defaultValues={info}
    />
  );
};

export default ProfilePage;
