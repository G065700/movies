import { KmdbMovieInfo } from '@/types/movies';
import Link from 'next/link';

export default MoviesSearchResult;

interface MoviesSearchResultProps {
  data: {
    searchResult?: KmdbMovieInfo[];
  };
}

const regEx = / !HS | !HE /g;
function MoviesSearchResult({ data }: MoviesSearchResultProps) {
  const { searchResult } = data;

  return (
    <table className="w-full table-fixed my-[10px] rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-400">
          <th className="inline-block w-[calc(40%_-_7px)] leading-[40px]">
            영화명
          </th>
          <th className="inline-block w-[calc(15%_-_2.5px)] leading-[40px]">
            감독명
          </th>
          <th className="inline-block w-[calc(15%_-_2.5px)] leading-[40px]">
            장르
          </th>
          <th className="inline-block w-[calc(20%_-_3px)] leading-[40px]">
            등급
          </th>
          <th className="inline-block w-[10%] leading-[40px]">개봉일</th>
        </tr>
      </thead>
      <tbody className="block max-h-[calc(100dvh_-_235px)] overflow-y-auto">
        {(!searchResult || searchResult.length === 0) && (
          <tr className="h-20 bg-gray-300 table w-full">
            <th scope="row">검색 조건과 일치하는 영화가 없습니다.</th>
          </tr>
        )}
        {searchResult?.map((movie: KmdbMovieInfo) => (
          <tr
            key={movie.DOCID}
            className={`
                block
                h-[40px]
                even:bg-slate-200
                odd:bg-white
                cursor-pointer
                hover:bg-gray-950 hover:text-white
              `}
          >
            <th className="inline-block w-[40%] h-full">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {movie.title.replace(regEx, '')}
              </Link>
            </th>
            <td className="inline-block w-[15%] h-full">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {movie.directors.director[0].directorNm.replace(regEx, '')}{' '}
                {movie.directors.director.length > 1 &&
                  `외 ${movie.directors.director.length - 1}명`}
              </Link>
            </td>
            <td className="inline-block w-[15%] h-full">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {movie.genre}
              </Link>
            </td>
            <td className="inline-block w-[20%] h-full">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {movie.rating}
              </Link>
            </td>
            <td className="inline-block w-[10%] h-full">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {movie.repRlsDate}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
