'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MovieSearchParamsForView } from '@/types/movies';
import Pagination from '@shared/pagination/Pagination';

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

  const defaultValues: MovieSearchParamsForView = {
    title: searchParams.title || '',
    releaseDts: searchParams.releaseDts || '',
    releaseDte: searchParams.releaseDte || '',
    director: searchParams.director || '',
    actor: searchParams.actor || '',
    page: searchParams.page || '1',
    countPerPage: searchParams.countPerPage || '20',
  };

  const selectedPage = Number(defaultValues.page);

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
