'use server';

import { KobisResData, MoviesSearchParams } from '@/types/movies';

async function retrieveMovies(params: MoviesSearchParams) {
  const {
    title = '',
    director = '',
    actor = '',
    page = '1',
    countPerPage = '20',
  } = await params;

  const startCount = String((Number(page) - 1) * Number(countPerPage));

  const qs = `collection=kmdb_new2&detail=Y&title=${title}&director=${director}&actor=${actor}&startCount=${startCount}&listCount=${countPerPage}&ServiceKey=${process.env.KMDB_KEY}`;
  const res = await fetch(
    `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?${qs}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  const data: KobisResData = await res.json();

  return data;
}

export default async function getMovies(params: MoviesSearchParams) {
  const data: KobisResData = await retrieveMovies(params);

  return {
    data,
  };
}
