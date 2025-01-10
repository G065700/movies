'use client';

import TextField from '@components/shared/form/TextField';
import { useState, useCallback, ChangeEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MovieSearchParamsForView } from '@/types/movies';

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

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSearchButton = () => {
    const tempSearchParams: MovieSearchParamsForView = {
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
    <div className="flex gap-[20px]">
      <div className="flex flex-wrap gap-[15px]">
        <TextField
          label="영상명"
          name="title"
          value={formValues.title}
          onChange={handleFormValues}
        />
        <div className="flex items-center gap-[10px]">
          <TextField
            label="개봉일"
            name="releaseDts"
            value={formValues.releaseDts}
            onChange={handleFormValues}
          />
          ~
          <TextField
            name="releaseDte"
            value={formValues.releaseDte}
            onChange={handleFormValues}
          />
        </div>
        <TextField
          label="감독명"
          name="director"
          value={formValues.director}
          onChange={handleFormValues}
        />
        <TextField
          label="배우명"
          name="actor"
          value={formValues.actor}
          onChange={handleFormValues}
        />
      </div>
      <button
        className="flex-1 bg-blue-500 px-4 rounded-lg text-white"
        onClick={handleSearchButton}
      >
        검색
      </button>
    </div>
  );
}
