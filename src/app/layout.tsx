import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import CookieRequest from '@/components/sections/Home/CookieRequest/CookieRequest';

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
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>
          Цифровая платформа для профсоюза: скидки, документы и обращения |
          НашСоюз
        </title>
        <link rel="canonical" href="https://souz365.ru/"></link>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml"></link>
      </head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta property="og:locale" content="ru_RU"></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:site_name" content="НашСоюз"></meta>
      <meta
        property="og:title"
        content="Цифровая платформа для профсоюза: скидки, документы и обращения | НашСоюз"
      ></meta>
      <meta
        property="og:description"
        content="Одна система для работы с участниками профсоюза: скидки, документы, обращения и статистика. Запуск за 3 шага, поддержка 24/7."
      ></meta>
      <meta property="og:url" content="https://souz365.ru/"></meta>
      <meta
        name="description"
        content="НашСоюз помогает профсоюзам вести участников в одной системе: скидки, документы, обращения, история участия и статистика. Быстрый запуск, поддержка 24/7 и тарифы без переплат."
      ></meta>
      <meta
        name="keywords"
        content="платформа для профсоюза, цифровой профсоюз, сервис для профсоюза, участники профсоюза, скидки для членов профсоюза, обращения профсоюза, документы профсоюза, личный кабинет профсоюза"
      ></meta>
      <meta
        name="robots"
        content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"
      ></meta>
      <meta name="color-scheme" content="only light"></meta>
      <meta name="yandex-verification" content="30cf19e6efee6408" />
      <meta property="og:image" content="/ogimage.jpg"></meta>
      <meta
        property="og:image:alt"
        content="НашСоюз — цифровая платформа для профсоюза"
      ></meta>
      <body className={nunitoSans.className}>
        <Providers>{children}</Providers>
        <CookieRequest />
      </body>
    </html>
  );
}
