import { KmdbResData } from '@/types/movies/movies';

export default async function getMovie(movieId: string) {
  const id = movieId.charAt(0);
  const seq = movieId.slice(1, movieId.length);

  try {
    const res = await fetch(
      `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&movieId=${id}&movieSeq=${seq}&ServiceKey=${process.env.KMDB_KEY}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
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
    console.error('Failed to fetch getMovie:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
