import getMovie from '@actions/movies/getMovie';
import Container from '@shared/container/Container';
import MovieDefaultInfo from '@components/movie/MovieDefaultInfo';
import {
  MovieResponseDataResultForDefaultInfo,
  MovieResponseDataResultForImagesInfo,
} from '@/types/movie';
import MovieStaffsInfo from '@components/movie/MovieStaffsInfo';
import { Staff } from '@/types/movies';
import MovieImagesInfo from '@components/movie/MovieImagesInfo';
import BackButton from '@components/movie/BackButton';

export default async function MoviePage({
  params,
}: {
  params: { movieId: string };
}) {
  const { movieId } = await params;
  const data = await getMovie(movieId);

  const movie = data.data.Data[0].Result[0];

  const defaultInfo: MovieResponseDataResultForDefaultInfo = {
    title: movie.title,
    genre: movie.genre,
    rating: movie.rating,
    repRlsDate: movie.repRlsDate,
    runtime: movie.runtime,
    keywords: movie.keywords,
    plot: movie.plots.plot,
    nation: movie.nation,
  };

  const staffs: Staff[] = movie.staffs.staff;

  const images: MovieResponseDataResultForImagesInfo = {
    stills: movie.stlls ? movie.stlls.split('|') : null,
    posters: movie.posters ? movie.posters.split('|') : null,
  };

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <MovieDefaultInfo data={{ defaultInfo }} />
        <MovieStaffsInfo data={{ staffs }} />
        <MovieImagesInfo data={{ images }} />
        <BackButton />
      </div>
    </Container>
  );
}
