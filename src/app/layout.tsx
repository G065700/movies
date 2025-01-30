import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import Navbar from '@components/shared/navbar/Navbar';
import ScreenSize from '@components/global/ScreenSize';
import Modal from '@components/global/Modal';

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

export const metadata: Metadata = {
  title: 'MOVIES',
  description: '박스오피스 및 영화 정보를 제공합니다.',
  keywords: '박스오피스, 영화 검색, 영화인 검색, boxoffice, movie',
  other: {
    'naver-site-verification': process.env.NAVER_SITE_VERIFICATION!,
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
      </body>
    </html>
  );
}
