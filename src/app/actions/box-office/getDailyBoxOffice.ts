'use server';

import { revalidateTag } from 'next/cache';
import { KobisDailyBoxOfficeRes } from '@/types/box-office/box-office';
import { getYesterday } from '@/helpers/getDate';

export default async function getDailyBoxOffice() {
  const yesterday = getYesterday();
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${yesterday}`;

  try {
    let res = await fetch(url, {
      method: 'GET',
      next: {
        tags: ['daily-box-office'],
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    let data: KobisDailyBoxOfficeRes = await res.json();

    const isLatestData =
      data.boxOfficeResult.showRange.split('~')[0] === yesterday;

    const now = new Date();
    const isRevalidateTime =
      (now.getHours() >= 15 && now.getMinutes() >= 5) || now.getHours() > 15;

    if (!isLatestData && isRevalidateTime) {
      revalidateTag('daily-box-office'); // 캐시 삭제

      const newRes = await fetch(url, {
        next: {
          tags: ['daily-box-office'],
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
    console.error('Failed to fetch getDailyBoxOffice:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
