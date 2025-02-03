export type MakersSearchParams = {
  peopleNm?: string;
  filmoNames?: string;
  page?: string;
  countPerPage?: string;
};

export type MakersSearchParamsForView = {
  [key: string]: string;
  peopleNm: string;
  filmoNames: string;
  page: string;
  countPerPage: string;
};

export type MakersResponse = {
  peopleListResult: MakersResponseData;
};

type MakersResponseData = {
  source: string;
  totCnt: number;
  peopleList: MakersResponseDataPeople[];
};

export type MakersResponseDataPeople = {
  peopleCd: string;
  peopleNm: string;
  peopleNmEn: string;
  repRoleNm: string;
  filmoNames: string;
};
