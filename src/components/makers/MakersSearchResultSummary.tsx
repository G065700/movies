'use client';

import { MakersSearchParamsForView } from '@/types/makers';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

export default MakersSearchResultSummary;

interface MakersSearchResultSummaryProps {
  data: {
    totalCount: number;
    searchParams: MakersSearchParamsForView;
  };
}

function MakersSearchResultSummary({ data }: MakersSearchResultSummaryProps) {
  const { totalCount, searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const countPerPage = searchParams.countPerPage;

  const handleCountPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const tempSearchParams: MakersSearchParamsForView = {
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
