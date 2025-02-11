import { MakerResponse } from '@/types/makers/maker';
import { revalidateTime } from '@/data/validation';

export default async function getMaker(peopleCd: string) {
  const res = await fetch(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?peopleCd=${peopleCd}&key=${process.env.KOBIS_KEY}`,
    {
      method: 'GET',
      next: {
        revalidate: revalidateTime,
      },
    },
  );

  const data: MakerResponse = await res.json();

  return {
    data,
  };
}
