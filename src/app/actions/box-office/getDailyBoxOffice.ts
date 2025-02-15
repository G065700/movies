'use server';

import { KobisDailyBoxOfficeRes } from '@/types/box-office/box-office';
import { getYesterday } from '@/helpers/getDate';
import { getSecondsUntilMidnight } from '@/data/validation';

export default async function getDailyBoxOffice() {
  const yesterday = getYesterday();

  try {
    const res = await fetch(
      `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${yesterday}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
        next: {
          revalidate: getSecondsUntilMidnight(),
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: KobisDailyBoxOfficeRes = await res.json();

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getDailyBoxOffice:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
