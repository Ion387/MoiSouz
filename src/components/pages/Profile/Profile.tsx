'use client';

import ProfileForm from '@/components/forms/ProfileForm';
import TradeUnionRegistrationForm from '@/components/forms/TradeUnionRegistrationForm';
import { useFetchProfile } from '@/hooks/useFetchProfile';
import { useForm } from '@/hooks/UseFormProfile';
import { Box, CircularProgress, Typography } from '@mui/material';

const ProfilePage = ({ setSteps }: { setSteps?: (arg0: number) => void }) => {
  const info = useFetchProfile();

  const { onCancel, onSubmit } = useForm();

  if (!info) {
    return (
      <CircularProgress
        sx={{ display: 'flex', mx: 'auto', mt: '50px' }}
        color="primary"
        size={40}
      />
    );
  }

  return !info?.ROLES?.includes('ROLE_TRADEUNION') ? (
    <ProfileForm
      setSteps={setSteps}
      onCancel={onCancel}
      onSubmit={onSubmit}
      loading={!info}
      defaultValues={info}
    />
  ) : (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" marginBottom={2}>
        Профиль профсоюза
      </Typography>
      <TradeUnionRegistrationForm />
    </Box>
  );
};

export default ProfilePage;
