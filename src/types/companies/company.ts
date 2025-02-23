export type CompanyResponse = {
  companyInfoResult: {
    source: string;
    companyInfo: CompanyResponseCompanyInfo;
  };
};

export type CompanyResponseCompanyInfo = {
  companyCd: string;
  companyNm: string;
  companyNmEn: string;
  ceoNm: string;
  parts: CompanyResponseCompanyInfoPart[];
  filmos: CompanyResponseCompanyFilmo[];
};

type CompanyResponseCompanyInfoPart = {
  companyPartNm: string;
};

export type CompanyResponseCompanyFilmo = {
  movieCd: string;
  movieNm: string;
  companyPartNm: string;
};

export type CompanyResponseCompanyInfoForDefaultInfo = Pick<
  CompanyResponseCompanyInfo,
  'companyCd' | 'companyNm' | 'companyNmEn' | 'ceoNm' | 'parts'
>;

export type CompanyResponseCompanyInfoFilmoListForView =
  CompanyResponseCompanyInfoFilmoForView[];

export type CompanyResponseCompanyInfoFilmoForView = Pick<
  CompanyResponseCompanyFilmo,
  'movieCd' | 'movieNm'
> & {
  companyPartNm: string[];
};
