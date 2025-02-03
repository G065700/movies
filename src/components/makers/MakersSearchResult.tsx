import { MakersResponseDataPeople } from '@/types/makers/makers';
import TableHeader, { TableHeaderCol } from '@shared/table/TableHeader';
import TableBodyRow from '@shared/table/TableBodyRow';
import ClickableTableBodyColHeader from '@shared/table/clickable-table-body-column/ClickableTableBodyColHeader';
import ClickableTableBodyCol from '@shared/table/clickable-table-body-column/ClickableTableBodyCol';
import TableBody from '@shared/table/TableBody';
import Table from '@shared/table/Table';
import TableBodyDataNotExistRow from '@shared/table/TableBodyDataNotExistRow';

export default MakersSearchResult;

interface MakersSearchResultProps {
  data: {
    searchResult?: MakersResponseDataPeople[];
  };
}

const tableHeaderRow: TableHeaderCol[] = [
  { name: '영화인명', width: 'w-[calc(20%_-_3px)]', className: 'pl-3' },
  { name: '분야', width: 'w-[calc(15%_-_2px)]' },
  { name: '필모리스트', width: 'w-[65%]' },
];

function MakersSearchResult({ data }: MakersSearchResultProps) {
  const { searchResult } = data;

  return (
    <Table>
      <TableHeader data={{ tableHeaderRow }} />
      <TableBody>
        {(!searchResult || searchResult.length === 0) && (
          <TableBodyDataNotExistRow text="검색 조건과 일치하는 영화인이 없습니다." />
        )}
        {searchResult?.map((maker: MakersResponseDataPeople) => (
          <TableBodyRow key={maker.peopleCd}>
            <ClickableTableBodyColHeader
              data={{
                href: `/makers/${maker.peopleCd}`,
                thStyle: 'w-[20%]',
                linkStyle: 'pl-3',
              }}
            >
              {maker.peopleNm}
            </ClickableTableBodyColHeader>
            <ClickableTableBodyCol
              data={{ href: `/makers/${maker.peopleCd}`, tdStyle: 'w-[15%]' }}
            >
              {maker.repRoleNm}
            </ClickableTableBodyCol>
            <ClickableTableBodyCol
              data={{ href: `/makers/${maker.peopleCd}`, tdStyle: 'w-[65%]' }}
            >
              {maker.filmoNames?.split('|').join(' | ')}
            </ClickableTableBodyCol>
          </TableBodyRow>
        ))}
      </TableBody>
    </Table>
  );
}
