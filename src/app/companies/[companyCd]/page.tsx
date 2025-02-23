import getCompany from '@actions/companies/getCompany';
import {
  CompanyResponseCompanyFilmo,
  CompanyResponseCompanyInfoForDefaultInfo,
} from '@/types/companies/company';
import Container from '@shared/container/Container';
import CompanyDefaultInfo from '@components/company/CompanyDefaultInfo';
import CompanyFilmosInfo from '@components/company/CompanyFilmosInfo';
import BackButton from '@shared/button/BackButton';

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ companyCd: string }>;
}) {
  const { companyCd } = await params;
  const data = await getCompany(companyCd);

  const company = data.data.companyInfoResult.companyInfo;

  const defaultInfo: CompanyResponseCompanyInfoForDefaultInfo = {
    companyCd: company.companyCd,
    companyNm: company.companyNm,
    companyNmEn: company.companyNmEn,
    ceoNm: company.ceoNm,
    parts: company.parts,
  };

  const filmosInfo: CompanyResponseCompanyFilmo[] = company.filmos;

  return (
    <Container className="flex flex-col gap-5 h-fit min-h-[calc(100dvh_-_40px)]">
      <CompanyDefaultInfo data={{ defaultInfo }} />
      <CompanyFilmosInfo data={{ filmosInfo }} />
      <BackButton />
    </Container>
  );
}
