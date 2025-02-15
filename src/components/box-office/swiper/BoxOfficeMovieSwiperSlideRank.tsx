export default BoxOfficeMovieSwiperSlideRank;

interface BoxOfficeCardRankProps {
  data: {
    rank: number;
  };
}

function BoxOfficeMovieSwiperSlideRank({ data }: BoxOfficeCardRankProps) {
  const { rank } = data;

  return (
    <div
      className={`text-lg ${rank <= 3 ? 'text-rose-500 font-bold' : 'text-black'}`}
    >
      {rank}
    </div>
  );
}
