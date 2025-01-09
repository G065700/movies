import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@components/navbar/Navbar';
import localFont from 'next/font/local';

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gowunDodum.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
