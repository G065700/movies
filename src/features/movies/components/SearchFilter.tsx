'use client';

import TextField from '@components/form/TextField';
import Division from '@components/division/Division';
import { FormValues } from '@features/movies/types/movies';
import { ChangeEvent } from 'react';

interface MovieSearchFilterProps {
  data: {
    formValues: FormValues;
  };
  handler: {
    handleFormValues: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
  };
}

export default function SearchFilter({
  data,
  handler,
}: MovieSearchFilterProps) {
  const { formValues } = data;
  const { handleFormValues, handleSubmit } = handler;

  return (
    <>
      <Division hasMarginTop={false} />
      <div className="flex gap-10">
        <TextField
          label="영화명"
          name="title"
          value={formValues.title}
          onChange={handleFormValues}
        />
        <div className="flex align-center gap-5">
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
        <button
          className="flex-1 bg-blue-500 px-4 rounded-lg text-white"
          onClick={handleSubmit}
        >
          검색
        </button>
      </div>
      <Division />
      <div>
        <select>
          <option>10개씩 보기</option>
          <option>20개씩 보기</option>
          <option>30개씩 보기</option>
        </select>
      </div>
    </>
  );
}
