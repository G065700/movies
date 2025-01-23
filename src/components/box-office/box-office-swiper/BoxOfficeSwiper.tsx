'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import BoxOfficeSwiperCardRank from '@components/box-office/box-office-swiper/BoxOfficeSwiperCardRank';
import BoxOfficeSwiperCardPoster from '@components/box-office/box-office-swiper/BoxOfficeSwiperCardPoster';
import BoxOfficeSwiperCardContent from '@components/box-office/box-office-swiper/BoxOfficeSwiperCardContent';
import { type ReactNode } from 'react';
import { BoxOfficeMovieForView } from '@/types/box-office';
import useScreenStore from '@/stores/useScreenStore';
import useModalStore from '@/stores/useModalStore';
import MovieModal from '@components/box-office/movie-modal/MovieModal';

export default BoxOfficeSwiper;

interface BoxOfficeCardSwiperProps {
  data: {
    boxOfficeList: BoxOfficeMovieForView[];
  };
}

function BoxOfficeSwiper({ data }: BoxOfficeCardSwiperProps) {
  const { boxOfficeList } = data;

  const { setModal } = useModalStore();

  const handleSwiperSlide = async (movie: BoxOfficeMovieForView) => {
    if (!movie.detail) return null;

    setModal({
      open: true,
      title: `[${movie.summary.movieNm}] 영화 정보`,
      content: (
        <MovieModal
          movie={movie.detail}
          movieNm={movie.summary.movieNm}
          audiAcc={movie.summary.audiAcc}
          salesAcc={movie.summary.salesAcc}
        />
      ),
    });
  };

  return (
    <BoxOfficeSwiperWrapper>
      {boxOfficeList.map((movie) => (
        <SwiperSlide
          key={movie.summary.movieCd}
          className="min-h-fit sm:min-h-full"
          onClick={() => {
            void handleSwiperSlide(movie);
          }}
        >
          <div
            className="
              cursor-pointer
              bg-white
              h-full
              min-w-[586px]
              border-solid border-2 border-black
              rounded-lg
              sm:flex
              sm:flex-col
              sm:gap-[10px]
              sm:p-3
              sm:min-w-full
              xl:flex-row
            "
          >
            <BoxOfficeSwiperCardRank
              data={{ rank: Number(movie.summary.rank) }}
            />
            <BoxOfficeSwiperCardPoster
              data={{
                posterSrc: movie.summary.poster,
                movieNm: movie.summary.movieNm,
              }}
            />
            <BoxOfficeSwiperCardContent data={{ movie }} />
          </div>
        </SwiperSlide>
      ))}
    </BoxOfficeSwiperWrapper>
  );
}

function BoxOfficeSwiperWrapper({ children }: { children: ReactNode }) {
  const innerWidth = useScreenStore((s) => s.getScreenSize().width);

  return (
    <>
      {innerWidth && (
        <Swiper
          spaceBetween={10}
          direction={innerWidth <= 856 ? 'vertical' : 'horizontal'}
          slidesPerView={
            innerWidth &&
            (innerWidth > 2094 || (innerWidth > 1024 && innerWidth < 1576)
              ? 4
              : 3)
          }
          className="h-[calc(100%_-_56px)] "
        >
          {children}
        </Swiper>
      )}
    </>
  );
}
