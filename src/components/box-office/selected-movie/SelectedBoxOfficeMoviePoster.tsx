import Image from 'next/image';

export default SelectedBoxOfficeMoviePoster;

interface BoxOfficeCardRankProps {
  data: {
    posterSrc: string;
    movieNm: string;
  };
}

function SelectedBoxOfficeMoviePoster({ data }: BoxOfficeCardRankProps) {
  const { posterSrc, movieNm } = data;
  return (
    <div>
      <Image
        width={300}
        height={430}
        src={posterSrc || '/poster.png'}
        alt={movieNm}
        className="rounded-lg min-w-[300px]"
        priority
      />
    </div>
  );
}
