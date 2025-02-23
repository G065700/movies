'use client';

import { CompaniesSearchParamsForView } from '@/types/companies/companies';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { defaultPaginationValue } from '@/data/pagination';
import TextField from '@shared/form/TextField';
import Button from '@shared/button/Button';

export default CompaniesSearchFilter;

interface CompaniesSearchFilterProps {
  data: {
    searchParams: CompaniesSearchParamsForView;
  };
}

function CompaniesSearchFilter({ data }: CompaniesSearchFilterProps) {
  const { searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const [formValues, setFormValues] =
    useState<CompaniesSearchParamsForView>(searchParams);

  useEffect(() => {
    setFormValues(searchParams);
  }, [searchParams]);

  const handleFormValues = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchButton = () => {
    const tempSearchParams: CompaniesSearchParamsForView = {
      ...formValues,
      page: defaultPaginationValue.page,
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
    <div className="flex justify-between gap-5">
      <div className="flex gap-[15px]">
        <TextField
          label="영화사명"
          name="companyNm"
          value={formValues.companyNm}
          onChange={handleFormValues}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchButton();
            }
          }}
        />
        <TextField
          label="대표자명"
          name="ceoNm"
          value={formValues.ceoNm}
          onChange={handleFormValues}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchButton();
            }
          }}
        />
      </div>
      <Button onClick={handleSearchButton}>검색</Button>
    </div>
  );
}
