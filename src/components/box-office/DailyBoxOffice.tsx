import BoxOfficeSectionTitle from '@components/box-office/BoxOfficeSectionTitle';
import { KobisDailyBoxOfficeRes } from '@/types/box-office';
import getDailyBoxOffice from '@actions/box-office/getDailyBoxOffice';
import BoxOfficeSectionSwiperGuideText from '@components/box-office/BoxOfficeSectionSwiperGuideText';
import BoxOfficeSectionContainer from '@components/box-office/BoxOfficeSectionContainer';
import BoxOfficeSectionContent from '@components/box-office/BoxOfficeSectionContent';

export default DailyBoxOffice;

async function DailyBoxOffice() {
  // 일별 박스오피스
  const dailyBoxOffice: { data: KobisDailyBoxOfficeRes } =
    await getDailyBoxOffice();

  const {
    data: { boxOfficeResult },
  } = dailyBoxOffice;

  const {
    boxofficeType: boxOfficeType,
    showRange: range,
    dailyBoxOfficeList: boxOfficeList,
  } = boxOfficeResult;

  return (
    <BoxOfficeSectionContainer>
      <BoxOfficeSectionTitle data={{ boxOfficeType, range }} />
      <BoxOfficeSectionSwiperGuideText />
      <BoxOfficeSectionContent data={{ boxOfficeList }} />
    </BoxOfficeSectionContainer>
  );
}
