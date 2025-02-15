'use client';

import { CompaniesResponseDataCompany } from '@/types/companies/companies';
import TableHeader, { TableHeaderCol } from '@shared/table/TableHeader';
import TableBodyRow from '@shared/table/TableBodyRow';
import ClickableTableBodyColHeader from '@shared/table/clickable-table-body-column/ClickableTableBodyColHeader';
import ClickableTableBodyCol from '@shared/table/clickable-table-body-column/ClickableTableBodyCol';
import TableBody from '@shared/table/TableBody';
import Table from '@shared/table/Table';
import TableBodyDataNotExistRow from '@shared/table/TableBodyDataNotExistRow';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default CompaniesSearchResult;

interface CompaniesSearchResultProps {
  data: {
    searchResult?: CompaniesResponseDataCompany[];
  };
}

const tableHeaderRow: TableHeaderCol[] = [
  { name: '영화사명', width: 'w-[calc(20%_-_3px)]', className: 'pl-3' },
  { name: '대표자명', width: 'w-[calc(15%_-_2px)]' },
  { name: '분류', width: 'w-[calc(20%_-_2px)]' },
  { name: '필모리스트', width: 'w-[45%]' },
];

function CompaniesSearchResult({ data }: CompaniesSearchResultProps) {
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
          <TableBodyDataNotExistRow text="검색 조건과 일치하는 영화사가 없습니다." />
        )}

        {searchResult?.map(
          (company: CompaniesResponseDataCompany, idx: number) => (
            <TableBodyRow
              key={company.companyCd}
              ref={idx === 0 ? tableBodyFirstRowRef : null}
            >
              <ClickableTableBodyColHeader
                data={{
                  href: `/companies/${company.companyCd}`,
                  thStyle: 'w-[20%]',
                  linkStyle: 'pl-3',
                }}
              >
                {company.companyNm}
              </ClickableTableBodyColHeader>
              <ClickableTableBodyCol
                data={{
                  href: `/companies/${company.companyCd}`,
                  tdStyle: 'w-[15%]',
                  linkStyle: 'text-center',
                }}
              >
                {company.ceoNm.split(', ')[0]}
                {company.ceoNm.split(', ').length > 1
                  ? ` 외 ${company.ceoNm.split(', ').length - 1} 명`
                  : ''}
              </ClickableTableBodyCol>
              <ClickableTableBodyCol
                data={{
                  href: `/companies/${company.companyCd}`,
                  tdStyle: 'w-[20%]',
                }}
              >
                {company.companyPartNames?.split(',').join(' | ')}
              </ClickableTableBodyCol>
              <ClickableTableBodyCol
                data={{
                  href: `/companies/${company.companyCd}`,
                  tdStyle: 'w-[45%]',
                }}
              >
                {company.filmoNames?.split(',').join(' | ')}
              </ClickableTableBodyCol>
            </TableBodyRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
