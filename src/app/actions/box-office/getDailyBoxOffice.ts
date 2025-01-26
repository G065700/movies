'use server';

import { KobisDailyBoxOfficeRes } from '@/types/box-office';

async function retrieveDailyBoxOffice(targetDt: string) {
  const res = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${targetDt}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  const data: KobisDailyBoxOfficeRes = await res.json();
  return data;
}

export default async function getDailyBoxOffice() {
  const d = new Date();
  d.setDate(d.getDate() - 1);

  const targetDt =
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0');

  const data = await retrieveDailyBoxOffice(targetDt);

  return {
    data,
  };
}
