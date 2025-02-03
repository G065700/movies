'use server';

import { KobisDailyBoxOfficeRes } from '@/types/box-office/box-office';
import { getYesterday } from '@/helpers/getDate';
import { revalidateTime } from '@/data/validation';

export default async function getDailyBoxOffice() {
  const yesterday = getYesterday();

  const res = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${yesterday}`,
    {
      method: 'GET',
      next: {
        revalidate: revalidateTime,
      },
    },
  );

  const data: KobisDailyBoxOfficeRes = await res.json();

  return {
    data,
  };
}
