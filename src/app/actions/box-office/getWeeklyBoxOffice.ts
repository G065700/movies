'use server';

import { KobisWeeklyBoxOfficeRes } from '@/types/box-office/box-office';
import { getLastSunday } from '@/helpers/getDate';
import { revalidateTime } from '@/data/validation';

export default async function getWeeklyBoxOffice() {
  const lastSunday = getLastSunday();

  const res = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${process.env.KOBIS_KEY}&targetDt=${lastSunday}&weekGb=0`,
    {
      method: 'GET',
      next: {
        revalidate: revalidateTime,
      },
    },
  );

  const data: KobisWeeklyBoxOfficeRes = await res.json();

  return {
    data,
  };
}
