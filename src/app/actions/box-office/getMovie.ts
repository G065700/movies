import { MoviesResponse } from '@/types/movies';

export default async function getMovie(name: string, openDt: string) {
  const res = await fetch(
    `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&&detail=Y&title=${name}&releaseDts=${openDt}&ServiceKey=${process.env.KMDB_KEY}`,
  );

  const data: MoviesResponse = await res.json();

  return {
    data,
  };
}
