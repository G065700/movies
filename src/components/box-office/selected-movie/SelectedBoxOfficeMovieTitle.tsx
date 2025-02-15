import Button from '@shared/button/Button';

export default SelectedBoxOfficeMovieTitle;

interface SelectedBoxOfficeMovieTitleProps {
  data: {
    movieNm: string;
  };
  handler: {
    handleReadMoreButtonClick: () => void;
  };
}

function SelectedBoxOfficeMovieTitle({
  data,
  handler,
}: SelectedBoxOfficeMovieTitleProps) {
  const { movieNm } = data;
  const { handleReadMoreButtonClick } = handler;

  return (
    <div className="flex justify-between">
      <div className="w-[calc(100%_-_80px)] text-xl font-black">
        <span>[{movieNm}] 영화 정보</span>
      </div>
      <Button onClick={handleReadMoreButtonClick}>자세히 보기</Button>
    </div>
  );
}
