import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import InformationIcon from '@components/box-office/InformationIcon';

export default BoxOfficeByPeriodTitle;

interface BoxOfficeCardListTitleProps {
  data: {
    boxOfficeType: string;
    range: string;
  };
}

function BoxOfficeByPeriodTitle({ data }: BoxOfficeCardListTitleProps) {
  const { boxOfficeType, range } = data;

  const rangeArr = range.split('~');
  const startDate = format(parseISO(rangeArr[0]), 'yyyy년 M월 d일 eeee', {
    locale: ko,
  });
  const endDate = format(parseISO(rangeArr[1]), 'yyyy년 M월 d일 eeee', {
    locale: ko,
  });

  const isDailyRange = startDate === endDate;

  return (
    <div className="flex items-center	gap-2 font-black">
      <span className="text-2xl">{boxOfficeType}</span>
      <span className="text-lg hidden sm:block">
        ({isDailyRange ? startDate : startDate + ' ~ ' + endDate})
      </span>
      <InformationIcon data={{ isDailyRange }} />
    </div>
  );
}
