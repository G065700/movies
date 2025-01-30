import Container from '@shared/container/Container';
import getMovies from '@actions/movies/getMovies';
import MoviesSearchFilter from '@components/movies/MoviesSearchFilter';
import { MovieSearchParamsForView, MoviesSearchParams } from '@/types/movies';
import Division from '@shared/division/Division';
import MoviesSearchResultSummary from '@components/movies/MoviesSearchResultSummary';
import MoviesSearchResult from '@components/movies/MoviesSearchResult';
import MoviesPagination from '@components/movies/MoviesPagination';

interface MoviesProps {
  searchParams: Promise<MoviesSearchParams>;
}

export default async function Movies({ searchParams }: MoviesProps) {
  const params = await searchParams;
  const movies = await getMovies(params);

  const searchParamsForView: MovieSearchParamsForView = {
    title: params.title || '',
    director: params.director || '',
    actor: params.actor || '',
    page: params.page || '1',
    countPerPage: params.countPerPage || '20',
  };

  const {
    data: { TotalCount: totalCount, Data: data },
  } = movies;

  return (
    <Container className="min-w-[980px]">
      <MoviesSearchFilter data={{ searchParams: searchParamsForView }} />
      <Division />
      <MoviesSearchResultSummary
        data={{
          searchParams: searchParamsForView,
          totalCount: totalCount,
        }}
      />
      <MoviesSearchResult data={{ searchResult: data[0].Result }} />
      <MoviesPagination
        data={{
          searchParams: searchParamsForView,
          totalCount: totalCount,
        }}
      />
    </Container>
  );
}
