'use client';

import { usePathname, useRouter } from 'next/navigation';
import { CompaniesSearchParamsForView } from '@/types/companies/companies';
import { useMemo } from 'react';
import { defaultPaginationValue } from '@/data/pagination';
import Pagination from '@shared/pagination/Pagination';

export default CompaniesPagination;

interface PaginationProps {
  data: {
    totalCount: number;
    searchParams: CompaniesSearchParamsForView;
  };
}

function CompaniesPagination({ data }: PaginationProps) {
  const { totalCount, searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const defaultValues: CompaniesSearchParamsForView = useMemo(
    () => ({
      companyNm: searchParams.companyNm || '',
      ceoNm: searchParams.ceoNm || '',
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
    const tempSearchParams: CompaniesSearchParamsForView = {
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
