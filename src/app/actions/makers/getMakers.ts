import { MakersResponse, MakersSearchParams } from '@/types/makers/makers';
import { defaultPaginationValue } from '@/data/pagination';
import { revalidateTime } from '@/data/validation';

export default async function getMakers(params: MakersSearchParams) {
  const {
    peopleNm = '',
    filmoNames = '',
    page = defaultPaginationValue.page,
    countPerPage = defaultPaginationValue.countPerPage,
  } = await params;

  const qs = `peopleNm=${peopleNm}&filmoNames=${filmoNames}&curPage=${page}&itemPerPage=${countPerPage}&key=${process.env.KOBIS_KEY}`;

  const res = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?${qs}`,
    {
      method: 'GET',
      next: {
        revalidate: revalidateTime,
      },
    },
  );

  const data: MakersResponse = await res.json();

  return {
    data,
  };
}
