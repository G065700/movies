import BoxOffice from '@features/home/components/Box-office';
import { format, subDays } from 'date-fns';
import Container from '@components/container/Container';
import Spacing30 from '@components/spacing/Spacing-40';

export default Home;

const yesterday = format(subDays(new Date(), 1), 'yyyyMMdd');
const day = new Date().getDay();

const lastSunday = format(subDays(new Date(), day), 'yyyyMMdd');

async function Home() {
  const dailyBoxOffice = await getDailyBoxOffice();
  const dailyBoxOfficeList: any[] = [];

  const weeklyBoxOffice = await getWeeklyBoxOffice();
  const weeklyBoxOfficeList: any[] = [];

  for (const movie of dailyBoxOffice.boxOfficeResult.dailyBoxOfficeList) {
    const movieDetailInfo = await getMovieDetailInfo(
      movie.movieNm,
      format(new Date(movie.openDt), 'yyyyMMdd'),
    );

    dailyBoxOfficeList.push({
      rank: movie.rank,
      movieNm: movie.movieNm,
      poster:
        movieDetailInfo.Data[0].Result[0].posters.split('.jpg')[0] + '.jpg',
      detail: movieDetailInfo.Data[0].Result[0],
    });
  }

  for (const movie of weeklyBoxOffice.boxOfficeResult.weeklyBoxOfficeList) {
    const movieDetailInfo = await getMovieDetailInfo(
      movie.movieNm,
      format(new Date(movie.openDt), 'yyyyMMdd'),
    );
    weeklyBoxOfficeList.push({
      rank: movie.rank,
      movieNm: movie.movieNm,
      poster:
        movieDetailInfo.Data[0].Result[0].posters.split('.jpg')[0] + '.jpg',
      detail: movieDetailInfo.Data[0].Result[0],
    });
  }

  return (
    <Container>
      <BoxOffice
        data={{
          boxOfficeType: dailyBoxOffice.boxOfficeResult.boxofficeType,
          boxOfficeList: dailyBoxOfficeList,
          range: dailyBoxOffice.boxOfficeResult.showRange,
        }}
      />
      <Spacing30 />
      <BoxOffice
        data={{
          boxOfficeType: weeklyBoxOffice.boxOfficeResult.boxofficeType,
          boxOfficeList: weeklyBoxOfficeList,
          range: weeklyBoxOffice.boxOfficeResult.showRange,
        }}
      />
    </Container>
  );
}

async function getDailyBoxOffice() {
  const response: Response = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOBIS_KEY}&targetDt=${yesterday}`,
  );
  return response.json();
}

async function getMovieDetailInfo(name: string, openDt: string) {
  const response: Response = await fetch(
    `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title=${name}&releaseDts=${openDt}&ServiceKey=${process.env.NEXT_PUBLIC_KMDB_KEY}`,
  );
  return response.json();
}

async function getWeeklyBoxOffice() {
  const response: Response = await fetch(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${process.env.NEXT_PUBLIC_KOBIS_KEY}&targetDt=${lastSunday}&weekGb=0`,
  );
  return response.json();
}
