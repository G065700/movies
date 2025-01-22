import { MakersResponse, MakersSearchParams } from '@/types/makers';

export default async function getMakers(params: MakersSearchParams) {
  const {
    peopleNm = '',
    filmoNames = '',
    page = '1',
    countPerPage = '20',
  } = await params;

  const qs = `peopleNm=${peopleNm}&filmoNames=${filmoNames}&curPage=${page}&itemPerPage=${countPerPage}&key=${process.env.KOBIS_KEY}`;

  const res = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?${qs}`,
  );

  const data: MakersResponse = await res.json();

  return {
    data,
  };
}
