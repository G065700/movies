import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { BoxOfficeItemForView } from '@/types/box-office';

export default BoxOfficeSwiperCardContent;

function BoxOfficeSwiperCardContent({
  data,
}: {
  data: {
    movie: BoxOfficeItemForView;
  };
}) {
  const { movie } = data;

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
        <Rating data={{ rating: movie.detail.rating }} />
        <span className="font-black">{movie.movieNm}</span>
      </div>
      <div className="flex flex-col flex-1">
        <span className="w-fit">장르: {movie.detail.genre}</span>
        <span className="w-fit">
          감독: {movie.detail.directors.director[0].directorNm}{' '}
          {movie.detail.directors.director.length > 1 &&
            `외 ${movie.detail.directors.director.length - 1}명`}
        </span>
        <span className="w-fit">
          개봉일:{' '}
          {format(parseISO(movie.detail.repRlsDate), 'yyyy년 M월 d일', {
            locale: ko,
          })}
        </span>
        <span className="w-fit">
          누적관객수: {Number(movie.audiAcc).toLocaleString()} 명
        </span>

        {/*{boxOfficeType.includes('일별') && (*/}
        {/*  <>*/}
        {/*    <span className="xl:hidden">*/}
        {/*      해당일 관객수: {Number(movie.audiCnt).toLocaleString()} 명 (*/}
        {/*      <span*/}
        {/*        className={`text-pretty ${Number(movie.audiChange) < 0 ? 'text-red-500' : 'text-blue-500'}`}*/}
        {/*      >*/}
        {/*        /!*{movie.audiChange}%*!/*/}
        {/*      </span>*/}
        {/*      )*/}
        {/*    </span>*/}

        {/*    <span className="hidden xl:inline">*/}
        {/*      해당일 관객수: {Number(movie.audiCnt).toLocaleString()} 명*/}
        {/*    </span>*/}

        {/*    <div className="hidden xl:inline">*/}
        {/*      관객수 증감율(어제 대비):{' '}*/}
        {/*      <span*/}
        {/*        className={`${Number(movie.audiChange) < 0 ? 'text-red-500' : 'text-blue-500'}`}*/}
        {/*      >*/}
        {/*        {movie.audiChange}%*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*  </>*/}
        {/*)}*/}
      </div>
    </div>
  );
}

function Rating({ data }: { data: { rating: string } }) {
  const { rating } = data;

  let bgColor;
  let age;

  if (rating === '청소년관람불가') {
    bgColor = 'bg-red-500';
    age = '19';
  } else if (rating.includes('15세이상')) {
    bgColor = 'bg-amber-400';
    age = '15';
  } else if (rating.includes('12세이상')) {
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
