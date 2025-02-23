export type MoviesSearchParams = {
  title?: string;
  director?: string;
  actor?: string;
  page?: string;
  countPerPage?: string;
};

export type MovieSearchParamsForView = {
  [key: string]: string;
  title: string;
  director: string;
  actor: string;
  page: string;
  countPerPage: string;
};

export type KmdbResData = {
  KMAQuery: string;
  Query: string;
  TotalCount: number;
  Data: MovieResponseData[];
};

type MovieResponseData = {
  CollName: string;
  Count: number;
  TotalCount: number;
  Result?: KmdbMovieInfo[];
};

export type KmdbMovieInfo = {
  ALIAS: string;
  Awards1: string; // 영화제수상내역
  Awards2: string; // 수상내역 기타
  Codes: {
    Code: { CodeNm: string; CodeNo: string }[];
  };
  CommCodes: {
    CommCode: { CodeNm: string; CodeNo: string }[];
  };
  DOCID: string;
  actors: {
    actor: Actor[];
  };
  audiAcc: string; // 누적관람인원
  company: string; // 제작사
  directors: {
    director: Director[];
  };
  episodes: string; // 영상 내 에피소드
  fLocation: string; // 촬영장소
  genre: string; // 장르
  keywords: string; // 키워드
  kmdbUrl: string; // 링크 URL
  modDate: string; // 최종수정일
  movieId: string; // 등록 ID
  movieSeq: string; // 등록 SEQ
  nation: string; // 제작국가
  openThtr: string; // 개봉극장
  plots: {
    plot: Plot[];
  };
  posters: string;
  prodYear: string; // 제작년도
  ratedYn: string; // 심의여부
  rating: string; // 대표관람등급
  ratings: {
    rating: Rating[];
  };
  regDate: string; // 등록일
  repRatDate: string; // 대표심의일
  repRlsDate: string; // 대표개봉일
  runtime: string; // 대표상영시간
  salesAcc: string; // 누적매출액
  screenArea: string; // 관람지역
  screenCnt: string; // 스크린수
  soundtrack: string; // 삽입곡
  staffs: {
    staff: Staff[];
  };
  stat: Stat[];
  statDate: string; // statDate
  statSouce: string; // 출처
  stlls: string;
  themeSong: string; // 주제곡
  title: string; // 영화명
  titleEng: string; // 영문제명
  titleEtc: string; // 원제명
  titleOrg: string; // 기타제명(제명 검색을 위해 관리되는 제명 모음)
  type: string; // 유형구분
  use: string; // 용도구분
  vods: {
    vod: Vod[];
  };
};

export type Actor = {
  actorId: string; // 배우등록번호
  actorNm: string; // 배우명
  actorEnNm: string; // 배우명(영문)
};

export type Director = {
  directorId: string; // 감독등록번호
  directorNm: string; // 감독명
  directorEnNm: string; // 감독명(영문)
};

export type Plot = {
  plotLang: string;
  plotText: string;
};

type Rating = {
  ratingDate: string; // 심의일
  ratingGrade: string; // 관람기준(e.g. 15새관람가)
  ratingMain: string; // 대표심의정보 여부
  ratingNo: string; // 심의번호
  releaseDate: string; // 개봉일자
  runtime: string; // 상영시간
};

export type Staff = {
  staffId: string; // 스텝등록번호
  staffNm: string; // 스텝이름
  staffEnNm: string;
  staffRole: string; // 스텝배역
  staffRoleGroup: string; // 스텝크레딧명
  staffEtc: string; // 스텝기타
};

type Stat = {
  audiAcc: string; // 누적관람인원
  salesAcc: string; // 누적매출액
  screenArea: string; // 관람지역
  screenCnt: string; // 스크린수
  statDate: string; // 기준일
  statSouce: string; // 출처
};

type Vod = {
  vodClass: string; // VOD 구분 (e.g. 티저 예고편)
  vodUrl: string; // VOD URL
};
