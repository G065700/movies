import getMovie from '@actions/movies/getMovie';
import Container from '@shared/container/Container';
import MovieDefaultInfo from '@components/movie/MovieDefaultInfo';
import MovieStaffsInfo from '@components/movie/MovieStaffsInfo';
import MovieImagesInfo from '@components/movie/MovieImagesInfo';
import {
  MovieResponseDataResultForDefaultInfo,
  MovieResponseDataResultForImagesInfo,
} from '@/types/movies/movie';
import { Staff } from '@/types/movies/movies';
import BackButton from '@shared/button/BackButton';

export default async function MoviePage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  const data = await getMovie(movieId);

  const movie = data.data.Data[0].Result?.[0];

  if (!movie) {
    return null;
  }

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
    <Container className="flex flex-col gap-5 h-fit min-h-[calc(100dvh_-_40px)]">
      <MovieDefaultInfo data={{ defaultInfo }} />
      <MovieStaffsInfo data={{ staffs }} />
      <MovieImagesInfo data={{ images }} />
      <BackButton />
    </Container>
  );
}
