import { KobisDailyBoxOfficeRes } from '@/types/box-office/box-office';
import BoxOfficeSectionTitle from '@components/box-office/BoxOfficeSectionTitle';
import getDailyBoxOffice from '@actions/box-office/getDailyBoxOffice';
import BoxOfficeSwiperGuidance from '@components/box-office/BoxOfficeSwiperGuidance';
import BoxOfficeContent from '@components/box-office/BoxOfficeContent';
import BoxOfficeContainer from '@components/box-office/BoxOfficeContainer';

export default DailyBoxOffice;

async function DailyBoxOffice() {
  // 일별 박스오피스 목록
  const dailyBoxOffice: { data: KobisDailyBoxOfficeRes } =
    await getDailyBoxOffice();

  const {
    data: { boxOfficeResult },
  } = dailyBoxOffice;

  const {
    boxofficeType,
    showRange: range,
    dailyBoxOfficeList: boxOfficeList,
  } = boxOfficeResult;

  return (
    <BoxOfficeContainer>
      <BoxOfficeSectionTitle data={{ boxofficeType, range }} />
      <BoxOfficeSwiperGuidance />
      <BoxOfficeContent data={{ boxOfficeList }} />
    </BoxOfficeContainer>
  );
}
