import { MakerResponse } from '@/types/maker';

export default async function getMaker(peopleCd: string) {
  const res = await fetch(
    `http://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?peopleCd=${peopleCd}&key=${process.env.KOBIS_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  const data: MakerResponse = await res.json();

  return {
    data,
  };
}
