import { MakersResponseDataPeople } from '@/types/makers';
import Link from 'next/link';

export default MakersSearchResult;

interface MakersSearchResultProps {
  data: {
    searchResult?: MakersResponseDataPeople[];
  };
}

function MakersSearchResult({ data }: MakersSearchResultProps) {
  const { searchResult } = data;

  return (
    <table className="w-full table-fixed my-[10px] rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-400">
          <th className="inline-block w-[calc(20%_-_3px)] leading-[40px]">
            영화인명
          </th>
          <th className="inline-block w-[calc(15%_-_2px)] leading-[40px]">
            분야
          </th>
          <th className="inline-block w-[65%] leading-[40px]">필모리스트</th>
        </tr>
      </thead>
      <tbody className="block max-h-[calc(100dvh_-_255px)] overflow-y-auto">
        {(!searchResult || searchResult.length === 0) && (
          <tr className="h-20 bg-gray-300 table w-full">
            <th scope="row">검색 조건과 일치하는 영화인이 없습니다.</th>
          </tr>
        )}
        {searchResult?.map((maker: MakersResponseDataPeople) => (
          <tr
            key={maker.peopleCd}
            className={`
                block
                h-[40px]
                even:bg-slate-200
                odd:bg-white
                cursor-pointer
                hover:bg-gray-950 hover:text-white
              `}
          >
            <th className="inline-block w-[20%] h-full">
              <Link
                href={`/makers/${maker.peopleCd}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {maker.peopleNm}
              </Link>
            </th>
            <td className="inline-block w-[15%] h-full">
              <Link
                href={`/makers/${maker.peopleCd}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {maker.repRoleNm}
              </Link>
            </td>
            <td className="inline-block w-[65%] h-full">
              <Link
                href={`/makers/${maker.peopleCd}`}
                className="block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {maker.filmoNames?.split('|').join(' | ')}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
