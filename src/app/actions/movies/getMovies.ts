'use server';

import { KmdbResData, MoviesSearchParams } from '@/types/movies/movies';
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

  try {
    const res = await fetch(
      `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?${qs}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
        next: {
          revalidate: revalidateTime,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: KmdbResData = await res.json();

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getMovies:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
