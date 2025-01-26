'use client';

import { usePathname, useRouter } from 'next/navigation';
import { MakersSearchParamsForView } from '@/types/makers';
import Pagination from '@shared/pagination/Pagination';

export default MakersPagination;

interface PaginationProps {
  data: {
    totalCount: number;
    searchParams: MakersSearchParamsForView;
  };
}

function MakersPagination({ data }: PaginationProps) {
  const { totalCount, searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const defaultValues: MakersSearchParamsForView = {
    peopleNm: searchParams.peopleNm || '',
    filmoNames: searchParams.filmoNames || '',
    page: searchParams.page || '1',
    countPerPage: searchParams.countPerPage || '20',
  };

  const selectedPage = Number(defaultValues.page);

  const handlePage = (page: number) => {
    const tempSearchParams: MakersSearchParamsForView = {
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
