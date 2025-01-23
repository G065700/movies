import { KmdbMovieInfo, Plot } from '@/types/movies';

export type MovieResponseDataResultForDefaultInfo = Pick<
  KmdbMovieInfo,
  | 'title'
  | 'genre'
  | 'rating'
  | 'repRlsDate'
  | 'runtime'
  | 'keywords'
  | 'nation'
> & {
  plot: Plot[];
};

export type MovieResponseDataResultForImagesInfo = {
  stills: string[] | null;
  posters: string[] | null;
};
