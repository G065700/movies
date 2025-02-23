import BoxOfficeRating from '@components/box-office/BoxOfficeRating';

export default BoxOfficeMovieSwiperSlide;

interface BoxOfficeSwiperSlideMovieProps {
  data: {
    audit: string;
    movieNm: string;
  };
}

function BoxOfficeMovieSwiperSlide({ data }: BoxOfficeSwiperSlideMovieProps) {
  const { audit, movieNm } = data;

  return (
    <div className="sm:w-[calc(100%_-_20px)] sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
      <BoxOfficeRating data={{ audit }} />
      <span className="font-black">{movieNm}</span>
    </div>
  );
}
