'use server';

import { KobisWeeklyBoxOfficeRes } from '@/types/box-office/box-office';
import { getLastSunday } from '@/helpers/getDate';
import { revalidateTag } from 'next/cache';

export default async function getWeeklyBoxOffice() {
  const lastSunday = getLastSunday();
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${lastSunday}&weekGb=0`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      next: {
        tags: ['weekly-box-office'],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    let data: KobisWeeklyBoxOfficeRes = await res.json();

    const isLatestData =
      data.boxOfficeResult.showRange.split('~')[1] === lastSunday;

    const now = new Date();
    const isRevalidateTime = !(
      now.getUTCHours() === 15 && now.getUTCMinutes() < 5
    );

    if (!isLatestData && isRevalidateTime) {
      revalidateTag('weekly-box-office'); // 캐시 삭제

      const newRes = await fetch(url, {
        method: 'GET',
        next: {
          tags: ['weekly-box-office'],
          revalidate: 0,
        },
      });

      if (!newRes.ok) {
        throw new Error(`HTTP error! Status: ${newRes.status}`);
      }

      data = await newRes.json();
    }

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getWeeklyBoxOffice:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
