import Container from '@shared/container/Container';
import { MakersSearchParams, MakersSearchParamsForView } from '@/types/makers';
import getMakers from '@actions/makers/getMakers';
import MakersSearchFilter from '@components/makers/MakersSearchFilter';
import Division from '@shared/division/Division';
import MakersSearchResultSummary from '@components/makers/MakersSearchResultSummary';
import MakersSearchResult from '@components/makers/MakersSearchResult';
import Pagination from '@components/makers/Pagination';

interface MakersProps {
  searchParams: MakersSearchParams;
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

  return (
    <Container className="min-w-[980px]">
      <MakersSearchFilter data={{ searchParams: searchParamsForView }} />
      <Division />
      <MakersSearchResultSummary
        data={{
          searchParams: searchParamsForView,
          totalCount: makers.data.peopleListResult.totCnt,
        }}
      />
      <MakersSearchResult
        data={{ searchResult: makers.data.peopleListResult.peopleList }}
      />
      <Pagination
        data={{
          searchParams: searchParamsForView,
          totalCount: makers.data.peopleListResult.totCnt,
        }}
      />
    </Container>
  );
}
