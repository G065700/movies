import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import Navbar from '@shared/nav/Navbar';
import ScreenSize from '@components/global/ScreenSize';
import Modal from '@components/global/Modal';
import MobileMenuButton from '@shared/nav/MobileMenuButton';
import Footer from '@shared/footer/Footer';

const gowunDodum = localFont({
  src: [
    {
      path: '../fonts/GowunDodum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/GowunDodum-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/GowunDodum-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  generator: 'Next.js',
  applicationName: 'MOVIES',
  referrer: 'origin-when-cross-origin',
  title: 'MOVIES',
  description: '박스오피스 및 영화 정보를 제공합니다.',
  keywords: '박스오피스, 영화 검색, 영화인 검색, boxoffice, movie, kobis, KMDB',
  openGraph: {
    title: 'MOVIES',
    siteName: 'MOVIES',
    description: '박스오피스 및 영화 정보를 제공합니다.',
    images: {
      url: '/favicon.ico',
    },
  },
  verification: {
    other: {
      'naver-site-verification': [
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION!,
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={gowunDodum.className}>
        <ScreenSize />
        <Modal />
        <Navbar />
        {children}
        <MobileMenuButton />
        <Footer />
      </body>
    </html>
  );
}
