import getMaker from '@actions/makers/getMaker';
import Container from '@shared/container/Container';
import MakerDefaultInfo from '@components/maker/MakerDefaultInfo';
import {
  MakerResponsePeopleInfoFilmo,
  MakerResponsePeopleInfoForDefaultInfo,
} from '@/types/maker';
import MakerFilmosInfo from '@components/maker/MakerFilmosInfo';
import BackButton from '@components/maker/BackButton';

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
    <Container>
      <div className="flex flex-col gap-5">
        <MakerDefaultInfo data={{ defaultInfo }} />
        <MakerFilmosInfo data={{ filmosInfo }} />
        <BackButton />
      </div>
    </Container>
  );
}
