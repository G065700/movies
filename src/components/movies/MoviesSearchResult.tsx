import { MovieResponseDataResult } from '@/types/movies';
import Link from 'next/link';

export default MoviesSearchResult;

interface MoviesSearchResultProps {
  data: {
    searchResult?: MovieResponseDataResult[];
  };
}

const regEx = / !HS | !HE /g;
function MoviesSearchResult({ data }: MoviesSearchResultProps) {
  const { searchResult } = data;

  return (
    <table className="w-full table-fixed my-[10px]">
      <thead>
        <tr className="block bg-gray-400">
          <th className="inline-block w-[40%] leading-[40px]">영화명</th>
          <th className="inline-block w-[15%]">감독명</th>
          <th className="inline-block w-[15%]">장르</th>
          <th className="inline-block w-[20%]">등급</th>
          <th className="inline-block w-[10%]">개봉일</th>
        </tr>
      </thead>
      <tbody className="block max-h-[calc(100dvh_-_345px)] overflow-y-auto">
        {(!searchResult || searchResult.length === 0) && (
          <tr className="h-20 bg-gray-300 table w-full">
            <th scope="row">검색 조건과 일치하는 영화가 없습니다.</th>
          </tr>
        )}
        {searchResult?.map((movie: MovieResponseDataResult) => (
          <tr
            key={movie.DOCID}
            className="
                block
                h-[40px]
                bg-gray-300
                border-solid border-b-[1px] border-stone-100
                cursor-pointer
                hover:bg-gray-950 hover:text-white
              "
          >
            <th className="inline-block w-[40%] leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="inline-block w-full"
              >
                {movie.title.replace(regEx, '')}
              </Link>
            </th>
            <td className="inline-block w-[15%] leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="inline-block w-full"
              >
                {movie.directors.director[0].directorNm.replace(regEx, '')}{' '}
                {movie.directors.director.length > 1 &&
                  `외 ${movie.directors.director.length - 1}명`}
              </Link>
            </td>
            <td className="inline-block w-[15%] leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="inline-block w-full"
              >
                {movie.genre}
              </Link>
            </td>
            <td className="inline-block w-[20%] leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="inline-block w-full"
              >
                {movie.rating}
              </Link>
            </td>
            <td className="inline-block w-[10%] leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
              <Link
                href={`/movies/${movie.DOCID}`}
                className="inline-block w-full"
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
