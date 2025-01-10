'use client';

import Container from '@components/container/Container';
import SearchFilter from '@features/movies/components/SearchFilter';
import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { FormValues } from '@features/movies/types/movies';

export default Movies;

function Movies() {
  const defaultFormValues = {
    title: '',
    releaseDts: '',
    releaseDte: '',
    director: '',
    actor: '',
  };

  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [movieSearchResult, setMovieSearchResult] = useState<any>();

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async () => {
    const res = await getMovieDetailInfo(formValues);
    setMovieSearchResult(res);
  };

  useEffect(() => {
    async function getMovieDetail() {
      const res = await getMovieDetailInfo(formValues);
      setMovieSearchResult(res);
    }
    getMovieDetail().then(() => {});
  }, []);

  return (
    <Container>
      <SearchFilter
        data={{ formValues }}
        handler={{ handleFormValues, handleSubmit }}
      />
      <table className="w-full">
        <thead className="h-10 bg-gray-400">
          <tr>
            <th scope="col">영화명</th>
            <th scope="col">감독명</th>
            <th scope="col">장르</th>
            <th scope="col">등급</th>
            <th scope="col">개봉일</th>
          </tr>
        </thead>
        <tbody>
          {movieSearchResult?.Data[0].Result == null && (
            <tr className="h-20 bg-gray-300">
              <th scope="row" colSpan={5}>
                검색 조건과 일치하는 영화가 없습니다.
              </th>
            </tr>
          )}
          {movieSearchResult?.Data[0].Result?.map((movie: any) => (
            <tr
              key={movie.DOCID}
              className="h-10 bg-gray-300 cursor-pointer hover:bg-gray-950 hover:text-white"
            >
              <th scope="row">{movie.title}</th>
              <td>{movie.directors.director[0].directorNm}</td>
              <td>{movie.genre}</td>
              <td>{movie.rating}</td>
              <td>{movie.repRlsDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

async function getMovieDetailInfo(formValues: FormValues) {
  const response: Response = await fetch(
    `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?listCount=50&collection=kmdb_new2&detail=Y&title=${formValues.title}&releaseDts=${formValues.releaseDts}&releaseDte=${formValues.releaseDte}&director=${formValues.director}&actor=${formValues.actor}&ServiceKey=${process.env.NEXT_PUBLIC_KMDB_KEY}`,
  );

  return response.json();
}
