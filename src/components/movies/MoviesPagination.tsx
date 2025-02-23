'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MovieSearchParamsForView } from '@/types/movies/movies';
import Pagination from '@shared/pagination/Pagination';
import { defaultPaginationValue } from '@/data/pagination';
import { useMemo } from 'react';

export default MoviesPagination;

interface PaginationProps {
  data: {
    totalCount: number;
    searchParams: MovieSearchParamsForView;
  };
}

function MoviesPagination({ data }: PaginationProps) {
  const { totalCount, searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const defaultValues: MovieSearchParamsForView = useMemo(
    () => ({
      title: searchParams.title || '',
      releaseDts: searchParams.releaseDts || '',
      releaseDte: searchParams.releaseDte || '',
      director: searchParams.director || '',
      actor: searchParams.actor || '',
      page: searchParams.page || defaultPaginationValue.page,
      countPerPage:
        searchParams.countPerPage || defaultPaginationValue.countPerPage,
    }),
    [searchParams],
  );

  const selectedPage = useMemo(
    () => Number(defaultValues.page),
    [defaultValues.page],
  );

  const handlePage = (page: number) => {
    const tempSearchParams: MovieSearchParamsForView = {
      ...defaultValues,
      page: String(page),
    };

    const qsArr: string[] = [];

    Object.keys(tempSearchParams).forEach((key) => {
      if (tempSearchParams[key]) {
        qsArr.push(`${key}=${tempSearchParams[key]}`);
      }
    });

    router.push(`${pathname}?${qsArr.join('&')}`);
  };

  return (
    <Pagination
      data={{
        selectedPage,
        countPerPage: Number(defaultValues.countPerPage),
        totalCount,
      }}
      handler={{
        handlePage,
      }}
    />
  );
}
