import {
  BoxOfficeMovieAllInfo,
  KobisMovieInfo,
  KobisMovieResData,
} from '@/types/box-office/box-office';
import { KmdbMovieInfo, KmdbResData } from '@/types/movies/movies';

export async function getBoxOfficeMovie(movieCd: string): Promise<{
  data: BoxOfficeMovieAllInfo;
}> {
  let kobisMovieInfo: KobisMovieInfo | null = null;
  let kmdbMovieInfo: KmdbMovieInfo | null = null;

  try {
    // 박스오피스 영화 상세(KOBIS)
    const kobisResData = await getKobisMovieInfoByMovieCd(movieCd);
    kobisMovieInfo = kobisResData.data;
  } catch (e) {
    console.error('Failed to fetch KOBIS movie data:', e);
  }

  try {
    // 영화 상세(KMDB)
    if (kobisMovieInfo) {
      const kmdbResData = await getKmdbMovieInfoByNameAndDirectorOrOpenDt(
        kobisMovieInfo.movieNm,
        kobisMovieInfo.directors[0]?.peopleNm,
        kobisMovieInfo.openDt,
      );
      kmdbMovieInfo = kmdbResData.data || null;
    }
  } catch (e) {
    console.error('Failed to fetch KMDB movie data:', e);
  }

  return {
    data: {
      kobis: kobisMovieInfo,
      kmdb: kmdbMovieInfo,
    },
  };
}

export async function getKobisMovieInfoByMovieCd(movieCd: string) {
  try {
    const res = await fetch(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?movieCd=${movieCd}&key=${process.env.KOBIS_KEY}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const resData: KobisMovieResData = await res.json();

    const data = resData.movieInfoResult.movieInfo;

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getKobisMovieInfoByMovieCd:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}

export async function getKmdbMovieInfoByNameAndDirectorOrOpenDt(
  name: string,
  director?: string,
  openDt?: string,
) {
  let qs = `title=${name}`;
  if (director) {
    qs += `&director=${director}`;
  } else if (openDt) {
    qs += `&openDt=${openDt}`;
  }

  try {
    const res = await fetch(
      `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=${process.env.KMDB_KEY}&${qs}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const resData: KmdbResData = await res.json();

    const data = resData.Data[0].Result?.[0];

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getKmdbMovieInfoByNameAndOpenDt:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
