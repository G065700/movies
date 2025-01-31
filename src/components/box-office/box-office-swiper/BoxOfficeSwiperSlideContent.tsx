import { BoxOfficeMovieForView } from '@/types/box-office';

export default BoxOfficeSwiperSlideContent;

function BoxOfficeSwiperSlideContent({
  data,
}: {
  data: {
    movie: BoxOfficeMovieForView;
  };
}) {
  const {
    movie: {
      summary: { movieNm, genre, director, audit, openDt, audiAcc },
    },
  } = data;

  return (
    <div
      className="
        flex
        gap-2
        h-full
        w-full
        items-center
        pl-[80px]
        sm:pl-0
        sm:flex-col
        sm:items-start
        xl:w-[300px]
      "
    >
      <div className="w-[60%] sm:w-full sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
        <Rating data={{ audit }} />
        <span className="font-black">{movieNm}</span>
      </div>
      <div className="flex flex-col flex-1 w-full">
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          장르: {genre}
        </span>
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          감독: {director}
        </span>
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          개봉일: {openDt}
        </span>
        <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          누적관객수: {Number(audiAcc).toLocaleString()} 명
        </span>
      </div>
    </div>
  );
}

function Rating({ data }: { data: { audit: string } }) {
  const { audit } = data;

  let bgColor;
  let age;

  if (audit === '청소년관람불가') {
    bgColor = 'bg-red-500';
    age = '19';
  } else if (audit.includes('15세이상')) {
    bgColor = 'bg-amber-400';
    age = '15';
  } else if (audit.includes('12세이상')) {
    bgColor = 'bg-blue-700';
    age = '12';
  } else {
    bgColor = 'bg-green-600';
    age = 'ALL';
  }

  return (
    <span
      className={`inline-block w-fit rounded-md py-[2px] px-[6px] text-white font-black mr-1 ${bgColor}`}
    >
      {age}
    </span>
  );
}
