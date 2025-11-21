import HomePage from '@/components/pages/Home/Home';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
