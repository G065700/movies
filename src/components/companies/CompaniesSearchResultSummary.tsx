'use client';

import { CompaniesSearchParamsForView } from '@/types/companies/companies';
import { usePathname, useRouter } from 'next/navigation';
import { defaultPaginationValue } from '@/data/pagination';
import { ChangeEvent } from 'react';
import CountPerPageSelect from '@shared/select/CountPerPageSelect';

export default CompaniesSearchResultSummary;

interface CompaniesSearchResultSummaryProps {
  data: {
    totalCount: number;
    searchParams: CompaniesSearchParamsForView;
  };
}

function CompaniesSearchResultSummary({
  data,
}: CompaniesSearchResultSummaryProps) {
  const { totalCount, searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const countPerPage = searchParams.countPerPage;

  const handleCountPerPage = (e: ChangeEvent<HTMLSelectElement>) => {
    const tempSearchParams: CompaniesSearchParamsForView = {
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
