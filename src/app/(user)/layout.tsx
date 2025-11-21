import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProfileLayout } from '@/components/layout/Profile';

export const metadata: Metadata = {};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <ProfileLayout>{children}</ProfileLayout>
    </Suspense>
  );
}
