'use server';

import { revalidateTag } from 'next/cache';
import { KobisDailyBoxOfficeRes } from '@/types/box-office/box-office';
import { getYesterday } from '@/helpers/getDate';
import { getSecondsUntilMidnight } from '@/data/validation';

const yesterday = getYesterday();
const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${yesterday}`;

export default async function getDailyBoxOffice() {
  try {
    const res = await fetch(url, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        tags: ['daily-box-office'],
        revalidate: getSecondsUntilMidnight(),
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
      (now.getUTCHours() >= 15 && now.getUTCMinutes() >= 5) ||
      now.getUTCHours() > 15;

    if (!isLatestData && isRevalidateTime) {
      console.log('캐시 무효화 후 데이터 다시 가져오기...(일별)');
      revalidateTag('daily-box-office'); // 캐시 삭제
      const newRes = await fetch(url, {
        cache: 'no-cache', // 강제로 새 데이터를 가져옴
      });

      if (!newRes.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
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
