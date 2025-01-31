import BoxOfficeSectionTitle from '@components/box-office/BoxOfficeSectionTitle';
import { KobisWeeklyBoxOfficeRes } from '@/types/box-office';
import getWeeklyBoxOffice from '@actions/box-office/getWeeklyBoxOffice';
import BoxOfficeSectionSwiperGuideText from '@components/box-office/BoxOfficeSectionSwiperGuideText';
import BoxOfficeSectionContent from '@components/box-office/BoxOfficeSectionContent';
import BoxOfficeSectionContainer from '@components/box-office/BoxOfficeSectionContainer';

export default WeeklyBoxOffice;

async function WeeklyBoxOffice() {
  // 주간  박스오피스
  const weeklyBoxOffice: { data: KobisWeeklyBoxOfficeRes } =
    await getWeeklyBoxOffice();

  const {
    data: { boxOfficeResult },
  } = weeklyBoxOffice;

  const {
    boxofficeType: boxOfficeType,
    showRange: range,
    weeklyBoxOfficeList: boxOfficeList,
  } = boxOfficeResult;

  return (
    <BoxOfficeSectionContainer>
      <BoxOfficeSectionTitle data={{ boxOfficeType, range }} />
      <BoxOfficeSectionSwiperGuideText />
      <BoxOfficeSectionContent data={{ boxOfficeList }} />
    </BoxOfficeSectionContainer>
  );
}
