import {
  CompaniesSearchParams,
  CompaniesSearchParamsForView,
} from '@/types/companies/companies';
import getCompanies from '@actions/companies/getCompanies';
import { defaultPaginationValue } from '@/data/pagination';
import Container from '@shared/container/Container';
import CompaniesSearchFilter from '@components/companies/CompaniesSearchFilter';
import Division from '@shared/division/Division';
import CompaniesSearchResultSummary from '@components/companies/CompaniesSearchResultSummary';
import CompaniesSearchResult from '@components/companies/CompaniesSearchResult';
import CompaniesPagination from '@components/companies/CompaniesPagination';

interface CompaniesProps {
  searchParams: Promise<CompaniesSearchParams>;
}

export default async function Companies({ searchParams }: CompaniesProps) {
  const params = await searchParams;
  const companies = await getCompanies(params);

  const searchParamsForView: CompaniesSearchParamsForView = {
    companyNm: params.companyNm || '',
    ceoNm: params.ceoNm || '',
    page: params.page || defaultPaginationValue.page,
    countPerPage: params.countPerPage || defaultPaginationValue.countPerPage,
  };

  const {
    data: {
      companyListResult: { totCnt, companyList },
    },
  } = companies;

  return (
    <Container>
      <CompaniesSearchFilter data={{ searchParams: searchParamsForView }} />
      <Division />
      <CompaniesSearchResultSummary
        data={{ searchParams: searchParamsForView, totalCount: totCnt }}
      />
      <CompaniesSearchResult data={{ searchResult: companyList }} />
      <CompaniesPagination
        data={{ searchParams: searchParamsForView, totalCount: totCnt }}
      />
    </Container>
  );
}
