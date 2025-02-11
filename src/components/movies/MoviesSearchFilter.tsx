'use client';

import TextField from '@components/shared/form/TextField';
import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MovieSearchParamsForView } from '@/types/movies/movies';
import Button from '@shared/button/Button';
import { defaultPaginationValue } from '@/data/pagination';

export default MoviesSearchFilter;

interface MoviesSearchFilterProps {
  data: {
    searchParams: MovieSearchParamsForView;
  };
}

function MoviesSearchFilter({ data }: MoviesSearchFilterProps) {
  const { searchParams } = data;

  const router = useRouter();
  const pathname = usePathname();

  const [formValues, setFormValues] =
    useState<MovieSearchParamsForView>(searchParams);

  useEffect(() => {
    setFormValues(searchParams);
  }, [searchParams]);

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSearchButton = useCallback(() => {
    const tempSearchParams: MovieSearchParamsForView = {
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
  }, [formValues, pathname, router]);

  return (
    <div className="flex justify-between gap-5">
      <div className="flex gap-[15px]">
        <TextField
          label="영화명"
          name="title"
          value={formValues.title}
          onChange={handleFormValues}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchButton();
            }
          }}
        />
        <TextField
          label="배우명"
          name="actor"
          value={formValues.actor}
          onChange={handleFormValues}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchButton();
            }
          }}
        />
        <TextField
          label="감독명"
          name="director"
          value={formValues.director}
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
