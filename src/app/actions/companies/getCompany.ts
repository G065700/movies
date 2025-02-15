import { CompanyResponse } from '@/types/companies/company';

export default async function getCompany(companyCd: string) {
  try {
    const res = await fetch(
      `http://www.kobis.or.kr/kobisopenapi/webservice/rest/company/searchCompanyInfo.json?companyCd=${companyCd}&key=${process.env.KOBIS_KEY}`,
      {
        method: 'GET',
        cache: 'force-cache', // 캐시 사용
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data: CompanyResponse = await res.json();

    return {
      data,
    };
  } catch (e) {
    console.error('Failed to fetch getCompany:', e);
    throw new Error(e instanceof Error ? e.message : 'Unknown error occurred');
  }
}
