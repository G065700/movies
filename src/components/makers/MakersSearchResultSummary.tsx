'use client';

import { MakersSearchParamsForView } from '@/types/makers/makers';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import CountPerPageSelect from '@shared/select/CountPerPageSelect';
import { defaultPaginationValue } from '@/data/pagination';

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
  };

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
