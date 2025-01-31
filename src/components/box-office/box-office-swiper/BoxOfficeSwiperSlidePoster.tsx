import Image from 'next/image';

export default BoxOfficeSwiperSlidePoster;

interface BoxOfficeCardRankProps {
  data: {
    posterSrc: string;
    movieNm: string;
  };
}

function BoxOfficeSwiperSlidePoster({ data }: BoxOfficeCardRankProps) {
  const { posterSrc, movieNm } = data;
  return (
    <div
      className="
        hidden
        sm:block
      "
    >
      <Image
        width={106}
        height={151}
        src={posterSrc || '/poster.png'}
        alt={movieNm}
        className="
          rounded-lg
          mx-auto
          max-h-[303px]
          2xl:max-h-[275px]
        "
        loading="lazy"
      />
    </div>
  );
}
