import { BoxOfficeMovieForView } from '@/types/box-office/box-office';
import SelectedBoxOfficeMovieInfo from '@components/box-office/selected-movie/SelectedBoxOfficeMovieInfo';
import SelectedBoxOfficeMovieTitle from '@components/box-office/selected-movie/SelectedBoxOfficeMovieTitle';

export default SelectedBoxOfficeMovie;

interface BoxOfficeSelectedMovieProps {
  data: {
    selectedMovie: BoxOfficeMovieForView;
  };
  handler: {
    handleReadMoreButtonClick: (movie: BoxOfficeMovieForView) => void;
  };
}

function SelectedBoxOfficeMovie({
  data,
  handler,
}: BoxOfficeSelectedMovieProps) {
  const { selectedMovie } = data;

  const handleReadMoreButtonClick = () => {
    handler.handleReadMoreButtonClick(selectedMovie);
  };

  return (
    <div
      className="
        h-[calc(100%_-_56px)]
        p-3
        hidden sm:flex sm:flex-col gap-[10px]
        bg-white
        border-solid border-2 border-black
        rounded-lg
      "
    >
      <SelectedBoxOfficeMovieTitle
        data={{ movieNm: selectedMovie.summary.movieNm }}
        handler={{ handleReadMoreButtonClick }}
      />
      <SelectedBoxOfficeMovieInfo data={{ selectedMovie }} />
    </div>
  );
}
