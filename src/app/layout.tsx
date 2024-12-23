import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const nunitoSans = Nunito_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['200', '300', '400', '600', '700', '800'],
  variable: '--font-nunito',
  style: ['normal'],
  display: 'swap',
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="color-scheme" content="only"></meta>
      <body className={nunitoSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
