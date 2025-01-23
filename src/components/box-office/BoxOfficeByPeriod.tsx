import BoxOfficeByPeriodTitle from '@components/box-office/BoxOfficeByPeriodTitle';
import BoxOfficeSwiper from '@components/box-office/box-office-swiper/BoxOfficeSwiper';
import { BoxOfficeListForView } from '@/types/box-office';

export default BoxOfficeByPeriod;

interface BoxOfficeByPeriodProps {
  data: BoxOfficeListForView;
}

function BoxOfficeByPeriod({ data }: BoxOfficeByPeriodProps) {
  const { boxOfficeType, boxOfficeList, range } = data;

  return (
    <div className="h-[calc(50%_-_20px)] sm:h-fit sm:max-h-full">
      <BoxOfficeByPeriodTitle data={{ boxOfficeType, range }} />
      <div className="h-[20px] text-[12px]">
        * 카드를 클릭한 상태로 드래그하면 이전/이후 카드가 보입니다.
      </div>
      <BoxOfficeSwiper data={{ boxOfficeList }} />
    </div>
  );
}
