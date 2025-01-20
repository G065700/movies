'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { MovieSearchParamsForView } from '@/types/movies';

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

  const handleCountPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const tempSearchParams: MovieSearchParamsForView = {
      ...searchParams,
      page: '1',
      countPerPage: e.target.value,
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
    <div className="flex justify-between items-center">
      <select
        name="countPerPage"
        value={countPerPage}
        onChange={handleCountPerPage}
        className="p-2 rounded-md"
      >
        <option value={'10'}>10개씩 보기</option>
        <option value={'20'}>20개씩 보기</option>
        <option value={'30'}>30개씩 보기</option>
      </select>
      <span>
        총 <strong>{totalCount.toLocaleString()}</strong> 개
      </span>
    </div>
  );
}
