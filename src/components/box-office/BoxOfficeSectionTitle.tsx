import BoxOfficeInformationIcon from '@components/box-office/BoxOfficeInformationIcon';
import { getKoDate } from '@/helpers/getDate';

export default BoxOfficeSectionTitle;

interface BoxOfficeCardListTitleProps {
  data: {
    boxofficeType: string;
    range: string;
  };
}

function BoxOfficeSectionTitle({ data }: BoxOfficeCardListTitleProps) {
  const { boxofficeType, range } = data;

  const rangeArr = range.split('~');

  const startDate = getKoDate(rangeArr[0]);
  const endDate = getKoDate(rangeArr[1]);

  const isDailyRange = startDate === endDate;
  const date = isDailyRange ? startDate : startDate + ' ~ ' + endDate;

  return (
    <div className="flex items-center gap-2 font-black">
      <span className="text-2xl">{boxofficeType}</span>
      <span className="text-lg hidden sm:block">({date})</span>
      <BoxOfficeInformationIcon data={{ isDailyRange }} />
    </div>
  );
}
