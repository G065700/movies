'use client';

import { KmdbMovieInfo } from '@/types/movies/movies';
import TableHeader, { TableHeaderCol } from '@shared/table/TableHeader';
import TableBodyRow from '@shared/table/TableBodyRow';
import ClickableTableBodyColHeader from '@shared/table/clickable-table-body-column/ClickableTableBodyColHeader';
import ClickableTableBodyCol from '@shared/table/clickable-table-body-column/ClickableTableBodyCol';
import TableBodyDataNotExistRow from '@shared/table/TableBodyDataNotExistRow';
import TableBody from '@shared/table/TableBody';
import Table from '@shared/table/Table';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default MoviesSearchResult;

interface MoviesSearchResultProps {
  data: {
    searchResult?: KmdbMovieInfo[];
  };
}

const regEx = / !HS | !HE /g;

const tableHeaderRow: TableHeaderCol[] = [
  { name: '영화명', width: 'w-[calc(40%_-_7px)]', className: 'pl-3' },
  { name: '감독명', width: 'w-[calc(15%_-_2.5px)]' },
  { name: '장르', width: 'w-[calc(15%_-_2.5px)]' },
  { name: '등급', width: 'w-[calc(20%_-_3px)]' },
  { name: '개봉일', width: 'w-[10%]' },
];

function MoviesSearchResult({ data }: MoviesSearchResultProps) {
  const { searchResult } = data;
  const searchParams = useSearchParams();

  const tableBodyFirstRowRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    if (tableBodyFirstRowRef.current) {
      tableBodyFirstRowRef.current.scrollIntoView();
    }
  }, [searchParams]);

  return (
    <Table>
      <TableHeader data={{ tableHeaderRow }} />

      <TableBody>
        {(!searchResult || searchResult.length === 0) && (
          <TableBodyDataNotExistRow text="검색 조건과 일치하는 영화가 없습니다." />
        )}
        {searchResult?.map((movie: KmdbMovieInfo, idx: number) => (
          <TableBodyRow
            key={movie.DOCID}
            ref={idx === 0 ? tableBodyFirstRowRef : null}
          >
            <ClickableTableBodyColHeader
              data={{
                href: `/movies/${movie.DOCID}`,
                thStyle: 'w-[40%]',
                linkStyle: 'pl-3',
              }}
            >
              {movie.title.replace(regEx, '')}
            </ClickableTableBodyColHeader>
            <ClickableTableBodyCol
              data={{ href: `/movies/${movie.DOCID}`, tdStyle: 'w-[15%]' }}
            >
              {movie.directors.director[0].directorNm.replace(regEx, '')}{' '}
              {movie.directors.director.length > 1 &&
                `외 ${movie.directors.director.length - 1} 명`}
            </ClickableTableBodyCol>

            <ClickableTableBodyCol
              data={{ href: `/movies/${movie.DOCID}`, tdStyle: 'w-[15%]' }}
            >
              {movie.genre.split(',').join(' | ')}
            </ClickableTableBodyCol>

            <ClickableTableBodyCol
              data={{ href: `/movies/${movie.DOCID}`, tdStyle: 'w-[20%]' }}
            >
              {movie.rating}
            </ClickableTableBodyCol>

            <ClickableTableBodyCol
              data={{ href: `/movies/${movie.DOCID}`, tdStyle: 'w-[10%]' }}
            >
              {movie.repRlsDate}
            </ClickableTableBodyCol>
          </TableBodyRow>
        ))}
      </TableBody>
    </Table>
  );
}
