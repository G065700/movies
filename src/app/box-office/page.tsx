import { format } from 'date-fns';
import getDailyBoxOffice from '@actions/box-office/getDailyBoxOffice';
import getWeeklyBoxOffice from '@actions/box-office/getWeeklyBoxOffice';
import getMovie from '@actions/box-office/getMovie';
import {
  BoxOfficeItem,
  BoxOfficeItemForView,
  BoxOfficeListForView,
  DailyBoxOfficeResponse,
  WeeklyBoxOfficeResponse,
} from '@/types/box-office';
import BoxOffice from '@components/box-office/BoxOffice';
import { MovieResponseDataResult, MoviesResponse } from '@/types/movies';

export default async function BoxOfficePage() {
  // 일별 박스오피스
  const dailyBoxOffice: { data: DailyBoxOfficeResponse } =
    await getDailyBoxOffice();
  const {
    data: { boxOfficeResult: dailyBoxOfficeResult },
  } = dailyBoxOffice;

  // 주간 박스오피스
  const weeklyBoxOffice: { data: WeeklyBoxOfficeResponse } =
    await getWeeklyBoxOffice();
  const {
    data: { boxOfficeResult: weeklyBoxOfficeResult },
  } = weeklyBoxOffice;

  const dailyBoxOfficeList: BoxOfficeItemForView[] = await getBoxOfficeListData(
    dailyBoxOfficeResult.dailyBoxOfficeList,
  );
  const weeklyBoxOfficeList: BoxOfficeItemForView[] =
    await getBoxOfficeListData(weeklyBoxOfficeResult.weeklyBoxOfficeList);

  const daily: BoxOfficeListForView = {
    boxOfficeType: dailyBoxOfficeResult.boxofficeType,
    range: dailyBoxOfficeResult.showRange,
    boxOfficeList: dailyBoxOfficeList,
  };

  const weekly: BoxOfficeListForView = {
    boxOfficeType: weeklyBoxOfficeResult.boxofficeType,
    range: weeklyBoxOfficeResult.showRange,
    boxOfficeList: weeklyBoxOfficeList,
  };

  return <BoxOffice data={{ daily, weekly }} />;
}

async function getBoxOfficeListData(boxOfficeListData: BoxOfficeItem[]) {
  const boxOfficeList: BoxOfficeItemForView[] = [];

  for (const movie of boxOfficeListData) {
    const name = movie.movieNm;
    const openDt = format(new Date(movie.openDt), 'yyyyMMdd');

    const movieDetailInfo: { data: MoviesResponse } = await getMovie(
      name,
      openDt,
    );

    const {
      data: { Data: detail },
    } = movieDetailInfo;

    const detailInfo: MovieResponseDataResult = detail[0].Result[0];

    boxOfficeList.push({
      rank: movie.rank,
      movieNm: movie.movieNm,
      audiCnt: movie.audiCnt, // 해당일의 관객수
      audiChange: movie.audiChange, // 전일 대비 관객수 증감 비율
      audiAcc: movie.audiAcc, // 누적관객수
      salesAcc: movie.salesAcc, // 누적매출액
      detail: detailInfo,
    });
  }

  return boxOfficeList;
}
