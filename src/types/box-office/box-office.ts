import { KmdbMovieInfo } from '@/types/movies/movies';

// 일별 박스오피스(KOBIS)
export type KobisDailyBoxOfficeRes = {
  boxOfficeResult: KobisDailyBoxOfficeResData;
};

type KobisDailyBoxOfficeResData = KobisBoxOfficeResDataIdentifier & {
  dailyBoxOfficeList: KobisBoxOfficeItem[];
};

// 주간 박스오피스(KOBIS)
export type KobisWeeklyBoxOfficeRes = {
  boxOfficeResult: KobisWeeklyBoxOfficeResData;
};

type KobisWeeklyBoxOfficeResData = KobisBoxOfficeResDataIdentifier & {
  yearWeekTime: string;
  weeklyBoxOfficeList: KobisBoxOfficeItem[];
};

type KobisBoxOfficeResDataIdentifier = {
  boxofficeType: string; // 박스오피스 종류
  showRange: string; // 박스오피스 조회 일자
};

export type KobisBoxOfficeItem = {
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

///////////////////////////////////////////////////////////////////////////////

// 영화 상세(KOBIS)
export type KobisMovieResData = {
  movieInfoResult: {
    source: string;
    movieInfo: KobisMovieInfo;
  };
};

export type KobisMovieInfo = {
  actors: KobisMovieActor[];
  audits: KobisMovieAudit[];
  companys: KobisMovieCompany[];
  directors: KobisMovieDirector[];
  genres: KobisMovieGenre[];
  movieCd: string;
  movieNm: string;
  movieNmEn: string;
  movieNmOg: string;
  openDt: string;
  nations: KobisMovieNation[];
  prdtStatNm: string;
  prdtYear: string;
  showTm: string;
  showTypes: KobisMovieShowType[];
  staffs: KobisMovieStaff[];
  typeNm: string;
};

type KobisMovieActor = KobisMoviePerson & {
  cast: string;
  castEn: string;
};

type KobisMovieAudit = {
  auditNo: string;
  watchGradeNm: string;
};

type KobisMovieCompany = {
  companyCd: string;
  companyNm: string;
  companyNmEn: string;
  companyPartNm: string;
};

type KobisMovieDirector = KobisMoviePerson;

type KobisMovieGenre = {
  genreNm: string;
};

type KobisMovieNation = {
  nationNm: string;
};

type KobisMovieShowType = {
  showTypeGroupNm: string;
  showTypeNm: string;
};

type KobisMovieStaff = KobisMoviePerson & {
  staffRoleNm: string;
};

type KobisMoviePerson = {
  peopleNm: string;
  peopleNmEn: string;
};

export type BoxOfficeMovieAllInfo = {
  kobis: KobisMovieInfo;
  kmdb: KmdbMovieInfo | undefined;
};

///////////////////////////////////////////////////////////////////////////////

export type BoxOfficeMovieForView = {
  summary: {
    rank: string;
    poster: string;
    movieCd: string;
    movieSeq?: string;
    movieNm: string;
    genre: string;
    director: string;
    audit: string;
    openDt: string;
    audiAcc: string; // 누적관객수
    salesAcc: string; // 누적매출액
  };
  detail?: KmdbMovieInfo;
};
