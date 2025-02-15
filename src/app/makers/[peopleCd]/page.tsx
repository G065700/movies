import getMaker from '@actions/makers/getMaker';
import Container from '@shared/container/Container';
import MakerDefaultInfo from '@components/maker/MakerDefaultInfo';
import MakerFilmosInfo from '@components/maker/MakerFilmosInfo';
import BackButton from '@shared/button/BackButton';
import {
  MakerResponsePeopleInfoFilmo,
  MakerResponsePeopleInfoForDefaultInfo,
} from '@/types/makers/maker';

export default async function MakerPage({
  params,
}: {
  params: Promise<{ peopleCd: string }>;
}) {
  const { peopleCd } = await params;
  const data = await getMaker(peopleCd);

  const maker = data.data.peopleInfoResult.peopleInfo;

  const defaultInfo: MakerResponsePeopleInfoForDefaultInfo = {
    peopleCd: maker.peopleCd,
    peopleNm: maker.peopleNm,
    peopleNmEn: maker.peopleNmEn,
    repRoleNm: maker.repRoleNm,
    sex: maker.sex,
  };

  const filmosInfo: MakerResponsePeopleInfoFilmo[] = maker.filmos;

  return (
    <Container className="flex flex-col gap-5 h-fit min-h-[calc(100dvh_-_40px)]">
      <MakerDefaultInfo data={{ defaultInfo }} />
      <MakerFilmosInfo data={{ filmosInfo }} />
      <BackButton />
    </Container>
  );
}
