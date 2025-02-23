import { MakersResponse, MakersSearchParams } from '@/types/makers/makers';
import { defaultPaginationValue } from '@/data/pagination';
import { getSecondsUntilMidnight } from '@/data/validation';

export default async function getMakers(params: MakersSearchParams) {
  const {
    peopleNm = '',
    filmoNames = '',
    page = defaultPaginationValue.page,
    countPerPage = defaultPaginationValue.countPerPage,
  } = await params;

  const qs = `peopleNm=${peopleNm}&filmoNames=${filmoNames}&curPage=${page}&itemPerPage=${countPerPage}&key=${process.env.KOBIS_KEY}`;

  try {
    const res = await fetch(
      `https://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?${qs}`,
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

    const data: MakersResponse = await res.json();

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getMakers:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
