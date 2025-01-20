import Image from 'next/image';

export default BoxOfficeSwiperCardPoster;

interface BoxOfficeCardRankProps {
  data: {
    posterSrc: string;
    movieNm: string;
  };
}

function BoxOfficeSwiperCardPoster({ data }: BoxOfficeCardRankProps) {
  const { posterSrc, movieNm } = data;
  return (
    <div
      className="
        hidden
        sm:block
        sm:h-[calc(100%_-_165px)]
      "
    >
      <Image
        width={500}
        height={100}
        src={posterSrc}
        alt={movieNm}
        className="
          max-h-full
          w-fit
          object-contain
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
