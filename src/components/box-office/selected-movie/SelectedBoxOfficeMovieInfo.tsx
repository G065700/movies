import SelectedBoxOfficeMoviePoster from '@components/box-office/selected-movie/SelectedBoxOfficeMoviePoster';
import BoxOfficeRating from '@components/box-office/BoxOfficeRating';
import { BoxOfficeMovieForView } from '@/types/box-office/box-office';
import { ReactNode } from 'react';

export default SelectedBoxOfficeMovieInfo;

interface BoxOfficeSelectedMovieInfoProps {
  data: {
    selectedMovie: BoxOfficeMovieForView;
  };
}

function SelectedBoxOfficeMovieInfo({ data }: BoxOfficeSelectedMovieInfoProps) {
  const { selectedMovie } = data;

  return (
    <div className="flex gap-[20px] overflow-y-auto">
      <SelectedBoxOfficeMoviePoster
        data={{
          posterSrc: selectedMovie.summary.poster,
          movieNm: selectedMovie.summary.movieNm,
        }}
      />

      <div className="flex flex-col gap-[15px] text-md">
        <DataRow
          label="순위"
          value={
            <div className="flex gap-[5px]">
              <span className="font-black">{selectedMovie.summary.rank}</span>
              <span>
                (&nbsp;
                <span
                  className={`font-black ${selectedMovie.summary.rankInten > 0 ? 'text-rose-500' : selectedMovie.summary.rankInten < 0 ? 'text-blue-500' : 'text-gray-500'}`}
                >
                  {selectedMovie.summary.rankInten > 0
                    ? '△ '
                    : selectedMovie.summary.rankInten < 0
                      ? '▽ '
                      : '-'}
                  {selectedMovie.summary.rankInten !== 0 &&
                    Math.abs(selectedMovie.summary.rankInten)}
                  &nbsp;
                </span>
                )
              </span>
              {selectedMovie.summary.rankOldAndNew === 'NEW' && (
                <span className="font-black text-gray-600 border-solid border-[1px] border-yellow-200 rounded-md bg-yellow-300 px-1">
                  {selectedMovie.summary.rankOldAndNew}
                </span>
              )}
            </div>
          }
        />
        <DataRow label="영화명" value={selectedMovie.summary.movieNm} />
        <DataRow label="장르" value={selectedMovie.summary.genres} />
        <DataRow
          label="등급"
          value={
            <>
              <BoxOfficeRating data={{ audit: selectedMovie.summary.audit }} />
              <div>{selectedMovie.summary.audit}</div>
            </>
          }
        />
        <DataRow label="개봉일" value={selectedMovie.summary.openDt} />
        <DataRow label="상영시간" value={selectedMovie.summary.runtime} />
        <DataRow label="감독" value={selectedMovie.summary.director} />
        <DataRow label="제작국가" value={selectedMovie.summary.nations} />
        <DataRow
          label="누적관객수"
          value={
            selectedMovie.summary?.audiAcc
              ? Number(selectedMovie.summary?.audiAcc).toLocaleString() + ' 명'
              : '-'
          }
        />
        <DataRow
          label="누적매출액"
          value={
            selectedMovie.summary?.salesAcc
              ? Number(selectedMovie.summary?.salesAcc).toLocaleString() + ' 원'
              : '-'
          }
        />
      </div>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center">
      <div className="min-w-[70px] font-bold">{label}</div>
      <div className="flex items-center">{value}</div>
    </div>
  );
}
