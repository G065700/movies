import BoxOfficeSectionTitle from '@components/box-office/BoxOfficeSectionTitle';
import { KobisWeeklyBoxOfficeRes } from '@/types/box-office/box-office';
import getWeeklyBoxOffice from '@actions/box-office/getWeeklyBoxOffice';
import BoxOfficeSwiperGuidance from '@components/box-office/BoxOfficeSwiperGuidance';
import BoxOfficeContent from '@components/box-office/BoxOfficeContent';
import BoxOfficeContainer from '@components/box-office/BoxOfficeContainer';

export default WeeklyBoxOffice;

async function WeeklyBoxOffice() {
  // 주간  박스오피스
  const weeklyBoxOffice: { data: KobisWeeklyBoxOfficeRes } =
    await getWeeklyBoxOffice();

  const {
    data: { boxOfficeResult },
  } = weeklyBoxOffice;

  const {
    boxofficeType,
    showRange: range,
    weeklyBoxOfficeList: boxOfficeList,
  } = boxOfficeResult;

  return (
    <BoxOfficeContainer>
      <BoxOfficeSectionTitle data={{ boxofficeType, range }} />
      <BoxOfficeSwiperGuidance />
      <BoxOfficeContent data={{ boxOfficeList }} />
    </BoxOfficeContainer>
  );
}
