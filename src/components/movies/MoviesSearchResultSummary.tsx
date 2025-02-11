'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';
import { MovieSearchParamsForView } from '@/types/movies/movies';
import CountPerPageSelect from '@shared/select/CountPerPageSelect';
import { defaultPaginationValue } from '@/data/pagination';

export default MoviesSearchResultSummary;

interface MoviesSearchResultSummaryProps {
  data: {
    totalCount: number;
    searchParams: MovieSearchParamsForView;
  };
}

function MoviesSearchResultSummary({ data }: MoviesSearchResultSummaryProps) {
  const { totalCount, searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const countPerPage = searchParams.countPerPage;

  const handleCountPerPage = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const tempSearchParams: MovieSearchParamsForView = {
        ...searchParams,
        page: defaultPaginationValue.page,
        countPerPage: e.target.value,
      };

      const qsArr: string[] = [];

      Object.keys(tempSearchParams).forEach((key) => {
        if (tempSearchParams[key]) {
          qsArr.push(`${key}=${tempSearchParams[key]}`);
        }
      });

      router.push(`${pathname}?${qsArr.join('&')}`);
    },
    [searchParams, pathname, router],
  );

  return (
    <div className="flex justify-between items-center">
      <CountPerPageSelect
        name="countPerPage"
        value={countPerPage}
        handleChange={handleCountPerPage}
      />
      <span>
        총 <strong>{totalCount.toLocaleString()}</strong> 개
      </span>
    </div>
  );
}
