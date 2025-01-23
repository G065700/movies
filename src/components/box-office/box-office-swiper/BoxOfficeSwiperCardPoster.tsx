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
      "
    >
      <Image
        width={106}
        height={151}
        src={posterSrc}
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
