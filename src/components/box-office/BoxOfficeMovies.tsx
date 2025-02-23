'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import BoxOfficeMovieSwiperSlideRank from '@components/box-office/swiper/BoxOfficeMovieSwiperSlideRank';
import { useState, type ReactNode } from 'react';
import MovieModal from '@components/box-office/modal/MovieModal';
import BoxOfficeMovieSwiperSlide from '@components/box-office/swiper/BoxOfficeMovieSwiperSlide';
import SelectedBoxOfficeMovie from '@components/box-office/selected-movie/SelectedBoxOfficeMovie';
import { BoxOfficeMovieForView } from '@/types/box-office/box-office';
import useScreenStore from '@/stores/useScreenStore';
import useModalStore from '@/stores/useModalStore';

export default BoxOfficeMovies;

interface BoxOfficeCardSwiperProps {
  data: {
    boxOfficeList: BoxOfficeMovieForView[];
  };
}

function BoxOfficeMovies({ data }: BoxOfficeCardSwiperProps) {
  const { boxOfficeList } = data;

  const [selectedMovieCd, setSelectedMovieCd] = useState<string>(
    boxOfficeList[0].summary.kobisMovieCd,
  );
  const selectedMovie = boxOfficeList.find(
    (bo) => bo.summary.kobisMovieCd === selectedMovieCd,
  );

  const { setModal } = useModalStore();

  const handleBoxOfficeMovieClick = (movieCd: string) => {
    setSelectedMovieCd(movieCd);
  };

  const handleReadMoreButtonClick = async (movie: BoxOfficeMovieForView) => {
    setModal({
      open: true,
      title: `[${movie.summary.movieNm}] 영화 정보`,
      content: movie.detail ? (
        <MovieModal movie={movie.detail} />
      ) : (
        <p className="text-center text-lg my-4">
          상세 영화 정보가 존재하지 않습니다.
        </p>
      ),
    });
  };

  const handleSwiperSlideClick = (movie: BoxOfficeMovieForView) => {
    innerWidth <= 856
      ? handleReadMoreButtonClick(movie)
      : handleBoxOfficeMovieClick(movie.summary.kobisMovieCd);
  };

  return (
    <>
      <BoxOfficeSwiper>
        {boxOfficeList.map((movie) => (
          <SwiperSlide
            onClick={() => {
              handleSwiperSlideClick(movie);
            }}
            key={movie.summary.kobisMovieCd}
          >
            <BoxOfficeSwiperSlideContent data={{ movie, selectedMovieCd }} />
          </SwiperSlide>
        ))}
      </BoxOfficeSwiper>
      {selectedMovie && (
        <SelectedBoxOfficeMovie
          data={{ selectedMovie }}
          handler={{ handleReadMoreButtonClick }}
        />
      )}
    </>
  );
}

function BoxOfficeSwiper({ children }: { children: ReactNode }) {
  const innerWidth = useScreenStore((s) => s.getScreenSize().width);

  if (innerWidth === 0) {
    return <></>;
  }

  return (
    <Swiper
      spaceBetween={10}
      direction={innerWidth < 856 ? 'vertical' : 'horizontal'}
      slidesPerView={4}
      className="h-full sm:h-fit max-w-full"
    >
      {children}
    </Swiper>
  );
}

interface BoxOfficeSwiperSlideProps {
  data: {
    movie: BoxOfficeMovieForView;
    selectedMovieCd: string;
  };
}

function BoxOfficeSwiperSlideContent({ data }: BoxOfficeSwiperSlideProps) {
  const { movie, selectedMovieCd } = data;

  return (
    <div
      className={`
        h-full
        flex items-center gap-[10px]
        p-3
        border-solid border-2 border-black
        rounded-lg
        bg-white
        ${selectedMovieCd !== movie.summary.kobisMovieCd && 'cursor-pointer hover:bg-yellow-100'}
        ${selectedMovieCd === movie.summary.kobisMovieCd ? 'sm:bg-yellow-200' : 'sm:bg-white sm:text-black'}
        transition duration-[300]
      `}
    >
      <BoxOfficeMovieSwiperSlideRank
        data={{ rank: Number(movie.summary.rank) }}
      />
      <BoxOfficeMovieSwiperSlide
        data={{ audit: movie.summary.audit, movieNm: movie.summary.movieNm }}
      />
    </div>
  );
}
