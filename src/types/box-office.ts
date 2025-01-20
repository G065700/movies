// 응답으로 받은 일별 박스오피스
import { MovieResponseDataResult } from '@/types/movies';

export type DailyBoxOfficeResponse = {
  boxOfficeResult: DailyBoxOfficeResponseResult;
};

type DailyBoxOfficeResponseResult = BoxOfficeIdentifier & {
  dailyBoxOfficeList: BoxOfficeItem[];
};

// 응답으로 받은 주간 박스오피스
export type WeeklyBoxOfficeResponse = {
  boxOfficeResult: WeeklyBoxOfficeResponseResult;
};

type WeeklyBoxOfficeResponseResult = BoxOfficeIdentifier & {
  yearWeekTime: string;
  weeklyBoxOfficeList: BoxOfficeItem[];
};

type BoxOfficeIdentifier = {
  boxofficeType: string; // 박스오피스 종류
  showRange: string; // 박스오피스 조회 일자
};

export type BoxOfficeItem = {
  audiAcc: string; // 누적관객수
  audiChange: string; // 전일 대비 관객수 증감 비율
  audiCnt: string; // 해당일의 관객수
  audiInten: string; // 전일 대비 관객수 증감분
  movieCd: string; // 영화의 대표코드
  movieNm: string; // 영화명(국문)
  openDt: string; // 영화의 개봉일
  rank: string; // 해당일자의 박스오피스 순위
  rankInten: string; // 전일대비 순위의 증감분
  rankOldAndNew: 'OLD' | 'NEW'; // 랭킹에 신규진입여부 (“OLD” : 기존 , “NEW” : 신규)
  rnum: string; // 순번
  salesAcc: string; // 누적매출액
  salesAmt: string; // 해당일의 매출액
  salesChange: string; // 전일 대비 매출액 증감 비율
  salesInten: string; // 전일 대비 매출액 증감분
  salesShare: string; // 해당일자 상영작의 매출총액 대비 해당 영화의 매출비율
  scrnCnt: string; // 해당일자에 상영한 스크린수
  showCnt: string; // 해당일자에 상영된 횟수
};

export type BoxOfficeListForView = {
  boxOfficeType: string;
  range: string;
  boxOfficeList: BoxOfficeItemForView[];
};

export type BoxOfficeItemForView = {
  rank: string;
  movieNm: string;
  audiCnt: string; // 해당일의 관객수
  audiChange: string; // 전일 대비 관객수 증감 비율
  audiAcc: string; // 누적관객수
  salesAcc: string;
  detail: MovieResponseDataResult;
};
