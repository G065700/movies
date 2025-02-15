'use server';

import { KobisWeeklyBoxOfficeRes } from '@/types/box-office/box-office';
import { getLastSunday } from '@/helpers/getDate';
import { getSecondsUntilMondayMidnight } from '@/data/validation';

export default async function getWeeklyBoxOffice() {
  const lastSunday = getLastSunday();

  try {
    const res = await fetch(
      `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${lastSunday}&weekGb=0`,
      {
        method: 'GET',
        next: {
          revalidate: getSecondsUntilMondayMidnight(),
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: KobisWeeklyBoxOfficeRes = await res.json();

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getWeeklyBoxOffice:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
