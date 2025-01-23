import { BoxOfficeMovieAllInfo, KobisMovieResData } from '@/types/box-office';
import { KobisResData } from '@/types/movies';
import { unstable_cache } from 'next/cache';

const retrieveKobisMovieInfoCache = unstable_cache(getKobisMovieInfoByMovieCd, [
  'getKobisMovieInfoByMovieCd',
]);
const retrieveKmdbMovieInfoCache = unstable_cache(
  getKmdbMovieInfoByNameAndOpenDt,
  ['getKmdbMovieInfoByNameAndOpenDt'],
);

export async function getBoxOfficeMovie(movieCd: string): Promise<{
  data: BoxOfficeMovieAllInfo;
}> {
  // 박스오피스 영화 상세(KOBIS)

  const kobisResData = await retrieveKobisMovieInfoCache(movieCd);

  const kobisMovieInfo = kobisResData.data;

  // 영화 상세 (KMDB)
  const kmdbResData = await retrieveKmdbMovieInfoCache(
    kobisMovieInfo.movieNm,
    kobisMovieInfo.openDt,
  );

  const kmdbMovieInfo = kmdbResData.data;

  return {
    data: {
      kobis: kobisMovieInfo,
      kmdb: kmdbMovieInfo,
    },
  };
}

export async function getKobisMovieInfoByMovieCd(movieCd: string) {
  const res = await fetch(
    `http:www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?movieCd=${movieCd}&key=${process.env.KOBIS_KEY}`,
  );

  const resData: KobisMovieResData = await res.json();

  const data = resData.movieInfoResult.movieInfo;

  return {
    data,
  };
}

export async function getKmdbMovieInfoByNameAndOpenDt(
  name: string,
  openDt: string,
) {
  const res = await fetch(
    `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&&detail=Y&title=${name}&releaseDts=${openDt}&ServiceKey=${process.env.KMDB_KEY}`,
  );

  const resData: KobisResData = await res.json();

  const data = resData.Data[0].Result?.[0];

  return {
    data,
  };
}
