'use client';

import TextField from '@components/shared/form/TextField';
import { useState, useCallback, ChangeEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MakersSearchParamsForView } from '@/types/makers';

export default MakersSearchFilter;

interface MakersSearchFilterProps {
  data: {
    searchParams: MakersSearchParamsForView;
  };
}

function MakersSearchFilter({ data }: MakersSearchFilterProps) {
  const { searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const [formValues, setFormValues] =
    useState<MakersSearchParamsForView>(searchParams);

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSearchButton = () => {
    const tempSearchParams: MakersSearchParamsForView = {
      ...formValues,
      page: '1',
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
    <div className="flex gap-[20px] justify-between items-end">
      <div className="flex flex-wrap gap-[15px]">
        <TextField
          label="영화인명"
          name="peopleNm"
          value={formValues.title}
          onChange={handleFormValues}
        />
        <TextField
          label="필모"
          name="filmoNames"
          value={formValues.director}
          onChange={handleFormValues}
        />
      </div>
      <button
        className="h-[48px] bg-blue-500 px-4 rounded-lg text-white"
        onClick={handleSearchButton}
      >
        검색
      </button>
    </div>
  );
}
