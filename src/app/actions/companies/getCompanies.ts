import {
  CompaniesResponse,
  CompaniesSearchParams,
} from '@/types/companies/companies';
import { defaultPaginationValue } from '@/data/pagination';
import { getSecondsUntilMidnight } from '@/data/validation';

export default async function getCompanies(params: CompaniesSearchParams) {
  const {
    companyNm = '',
    ceoNm = '',
    page = defaultPaginationValue.page,
    countPerPage = defaultPaginationValue.countPerPage,
  } = await params;

  const qs = `companyNm=${companyNm}&ceoNm=${ceoNm}&curPage=${page}&itemPerPage=${countPerPage}&key=${process.env.KOBIS_KEY}`;

  try {
    const res = await fetch(
      `http://kobis.or.kr/kobisopenapi/webservice/rest/company/searchCompanyList.json?${qs}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
        next: {
          revalidate: getSecondsUntilMidnight(),
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: CompaniesResponse = await res.json();

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getCompanies:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
