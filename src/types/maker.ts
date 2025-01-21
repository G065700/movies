export type MakerResponse = {
  peopleInfoResult: {
    source: string;
    peopleInfo: MakerResponsePeopleInfo;
  };
};

export type MakerResponsePeopleInfo = {
  peopleCd: string;
  peopleNm: string;
  peopleNmEn: string;
  repRoleNm: string;
  sex: string;
  homepages: string[];
  filmos: MakerResponsePeopleInfoFilmo[];
};

export type MakerResponsePeopleInfoFilmo = {
  movieCd: string;
  movieNm: string;
  moviePartNm: string;
};

export type MakerResponsePeopleInfoForDefaultInfo = Pick<
  MakerResponsePeopleInfo,
  'peopleCd' | 'peopleNm' | 'peopleNmEn' | 'repRoleNm' | 'sex'
>;

export type MakerResponsePeopleInfoFilmoListForView =
  MakerResponsePeopleInfoFilmoForView[];

export type MakerResponsePeopleInfoFilmoForView = Pick<
  MakerResponsePeopleInfoFilmo,
  'movieCd' | 'movieNm'
> & {
  moviePartNm: string[];
};
