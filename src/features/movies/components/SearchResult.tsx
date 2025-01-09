interface SearchResultProps {
  data: {
    movieSearchResult: any;
  };
}

export default function SearchResult({ data }: SearchResultProps) {
  const { movieSearchResult } = data;

  return (
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
        {movieSearchResult?.Data[0].Result.map((movie: any) => (
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
  );
}
