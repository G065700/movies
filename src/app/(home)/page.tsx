import getDailyBoxOffice from '@actions/box-office/getDailyBoxOffice';
import getWeeklyBoxOffice from '@actions/box-office/getWeeklyBoxOffice';
import { getBoxOfficeMovie } from '@actions/box-office/movie/getBoxOfficeMovie';
import {
  KobisBoxOfficeItem,
  BoxOfficeMovieListByPeriodForView,
  KobisDailyBoxOfficeRes,
  KobisWeeklyBoxOfficeRes,
  BoxOfficeMovieForView,
} from '@/types/box-office';
import BoxOffice from '@components/box-office/BoxOffice';

export const revalidate = 300;
export const dynamicParams = false; // or false, to 404 on unknown paths

export default async function BoxOfficePage() {
  // 일별 박스오피스
  const dailyBoxOffice: { data: KobisDailyBoxOfficeRes } =
    await getDailyBoxOffice();
  const {
    data: { boxOfficeResult: dailyBoxOfficeResult },
  } = dailyBoxOffice;

  // 주간 박스오피스
  const weeklyBoxOffice: { data: KobisWeeklyBoxOfficeRes } =
    await getWeeklyBoxOffice();
  const {
    data: { boxOfficeResult: weeklyBoxOfficeResult },
  } = weeklyBoxOffice;

  const dailyBoxOfficeList: BoxOfficeMovieForView[] =
    await getBoxOfficeListData(dailyBoxOfficeResult.dailyBoxOfficeList);

  const weeklyBoxOfficeList: BoxOfficeMovieForView[] =
    await getBoxOfficeListData(weeklyBoxOfficeResult.weeklyBoxOfficeList);

  const daily: BoxOfficeMovieListByPeriodForView = {
    boxOfficeType: dailyBoxOfficeResult.boxofficeType,
    range: dailyBoxOfficeResult.showRange,
    boxOfficeList: dailyBoxOfficeList,
  };

  const weekly: BoxOfficeMovieListByPeriodForView = {
    boxOfficeType: weeklyBoxOfficeResult.boxofficeType,
    range: weeklyBoxOfficeResult.showRange,
    boxOfficeList: weeklyBoxOfficeList,
  };

  return <BoxOffice data={{ daily, weekly }} />;
}

async function getBoxOfficeListData(boxOfficeListData: KobisBoxOfficeItem[]) {
  const boxOfficeList: BoxOfficeMovieForView[] = [];

  for (const boxOfficeItemData of boxOfficeListData) {
    const movieCd = boxOfficeItemData.movieCd;

    const {
      data: { kobis, kmdb },
    } = await getBoxOfficeMovie(movieCd);

    const genres = kobis.genres.map((genre) => genre.genreNm);
    const directors = kobis.directors.map((director) => director.peopleNm);
    const audit = kobis.audits.map((audit) => audit.watchGradeNm);
    const posters = kmdb?.posters;

    boxOfficeList.push({
      summary: {
        rank: boxOfficeItemData.rank,
        poster: posters ? posters.split('|')[0] : '/poster.png',
        movieCd: boxOfficeItemData.movieCd,
        movieSeq: kmdb?.movieSeq,
        movieNm: boxOfficeItemData.movieNm,
        genre: genres.join(' | '),
        director: `${directors[0]} ${directors.length > 1 ? `외 ${directors.length - 1} 명` : ''}`,
        audit: audit.join(' | '),
        openDt: boxOfficeItemData.openDt,
        audiAcc: boxOfficeItemData.audiAcc,
        salesAcc: boxOfficeItemData.salesAcc,
      },
      detail: kmdb,
    });
  }

  return boxOfficeList;
}
