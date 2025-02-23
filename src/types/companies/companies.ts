export type CompaniesSearchParams = {
  companyNm?: string;
  ceoNm?: string;
  page?: string;
  countPerPage?: string;
};

export type CompaniesSearchParamsForView = {
  [key: string]: string;
  companyNm: string;
  ceoNm: string;
  page: string;
  countPerPage: string;
};

export type CompaniesResponse = {
  companyListResult: CompaniesResponseData;
};

type CompaniesResponseData = {
  source: string;
  totCnt: number;
  companyList: CompaniesResponseDataCompany[];
};

export type CompaniesResponseDataCompany = {
  companyCd: string;
  companyNm: string;
  companyNmEn: string;
  companyPartNames: string;
  ceoNm: string;
  filmoNames: string;
};
