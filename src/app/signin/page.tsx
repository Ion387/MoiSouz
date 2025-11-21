import Signin from '@/components/pages/Signin/Signin';
import React, { Suspense } from 'react';

const SignIn = () => {
  return (
    <Suspense>
      <Signin />
    </Suspense>
  );
};

export default SignIn;
