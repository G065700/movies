import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import Navbar from '@components/shared/navbar/Navbar';
import ExchangeGlobal from '@components/client/ExchangeGlobal';
import ExchangeModal from '@components/client/ExchangeModal';

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
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={gowunDodum.className}>
      <body>
        <ExchangeModal />
        <ExchangeGlobal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
