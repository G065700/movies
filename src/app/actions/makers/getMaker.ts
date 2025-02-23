import { MakerResponse } from '@/types/makers/maker';

export default async function getMaker(peopleCd: string) {
  try {
    const res = await fetch(
      `http://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?peopleCd=${peopleCd}&key=${process.env.KOBIS_KEY}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: MakerResponse = await res.json();

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getMaker:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
