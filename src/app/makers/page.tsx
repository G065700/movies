import Container from '@shared/container/Container';
import { MakersSearchParams, MakersSearchParamsForView } from '@/types/makers';
import getMakers from '@actions/makers/getMakers';
import MakersSearchFilter from '@components/makers/MakersSearchFilter';
import Division from '@shared/division/Division';
import MakersSearchResultSummary from '@components/makers/MakersSearchResultSummary';
import MakersSearchResult from '@components/makers/MakersSearchResult';
import MakersPagination from '@components/makers/MakersPagination';

interface MakersProps {
  searchParams: Promise<MakersSearchParams>;
}

export default async function Makers({ searchParams }: MakersProps) {
  const params = await searchParams;
  const makers = await getMakers(params);

  const searchParamsForView: MakersSearchParamsForView = {
    peopleNm: params.peopleNm || '',
    filmoNames: params.filmoNames || '',
    page: params.page || '1',
    countPerPage: params.countPerPage || '20',
  };

  const {
    data: {
      peopleListResult: { totCnt, peopleList },
    },
  } = makers;

  return (
    <Container className="min-w-[980px]">
      <MakersSearchFilter data={{ searchParams: searchParamsForView }} />
      <Division />
      <MakersSearchResultSummary
        data={{
          searchParams: searchParamsForView,
          totalCount: totCnt,
        }}
      />
      <MakersSearchResult data={{ searchResult: peopleList }} />
      <MakersPagination
        data={{
          searchParams: searchParamsForView,
          totalCount: totCnt,
        }}
      />
    </Container>
  );
}
