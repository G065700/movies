'use server';

import { KobisResData, MoviesSearchParams } from '@/types/movies/movies';
import { defaultPaginationValue } from '@/data/pagination';
import { revalidateTime } from '@/data/validation';

export default async function getMovies(params: MoviesSearchParams) {
  const {
    title = '',
    director = '',
    actor = '',
    page = defaultPaginationValue.page,
    countPerPage = defaultPaginationValue.countPerPage,
  } = await params;

  const startCount = String((Number(page) - 1) * Number(countPerPage));

  const qs = `collection=kmdb_new2&detail=Y&title=${title}&director=${director}&actor=${actor}&startCount=${startCount}&listCount=${countPerPage}&ServiceKey=${process.env.KMDB_KEY}`;
  const res = await fetch(
    `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?${qs}`,
    {
      method: 'GET',
      next: {
        revalidate: revalidateTime,
      },
    },
  );

  const data: KobisResData = await res.json();

  return {
    data,
  };
}
