import { KobisResData } from '@/types/movies/movies';
import { revalidateTime } from '@/data/validation';

export default async function getMovie(movieId: string) {
  const id = movieId.charAt(0);
  const seq = movieId.slice(1, movieId.length);

  const res = await fetch(
    `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&movieId=${id}&movieSeq=${seq}&ServiceKey=${process.env.KMDB_KEY}`,
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
