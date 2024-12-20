'use client';

import { CircularProgress } from '@mui/material';

import ProfileForm from '@/components/forms/ProfileForm';

import { useRouter } from 'next/navigation';
import { useGetProfileInfo } from '@/hooks/UseGetProfileInfo';

import { IFormProfile } from '@/models/Forms';
import { saveFormProfile, saveFormProfileAvatar } from '@/hooks/UseFormProfile';

const DocumentsPage = () => {
  const router = useRouter();

  const { profileInfo } = useGetProfileInfo();

  const onCancel = () => {
    router.push('/main');
  };

  const onSubmit: (data: IFormProfile) => Promise<void> = async (data) => {
    await saveFormProfileAvatar(data.avatar);
    await saveFormProfile(data);
  };

  if (!profileInfo) {
    return (
      <CircularProgress
        sx={{ display: 'flex', mx: 'auto' }}
        color="primary"
        size={40}
      />
    );
  }

  return (
    <ProfileForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      loading={!profileInfo}
      defaultValues={profileInfo}
    />
  );
};

export default DocumentsPage;
