import { CompanyResponseCompanyInfoForDefaultInfo } from '@/types/companies/company';
import Data from '@shared/data/Data';
import DataRow from '@shared/data/DataRow';

export default CompanyDefaultInfo;

interface CompanyDefaultInfoProps {
  data: {
    defaultInfo: CompanyResponseCompanyInfoForDefaultInfo;
  };
}

function CompanyDefaultInfo({ data }: CompanyDefaultInfoProps) {
  const { defaultInfo } = data;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-black">기본 정보</div>
      <DataRow>
        <Data title="영화사명" content={defaultInfo.companyNm} />
        <Data
          title={<span className="text-pretty">영화사명(영문)</span>}
          content={defaultInfo.companyNmEn}
        />
      </DataRow>
      <DataRow>
        <Data title="대표자명" content={defaultInfo.ceoNm} />
        <Data
          title={<span className="text-pretty">분류</span>}
          content={defaultInfo.parts
            .map((part) => part.companyPartNm)
            .join(' | ')}
        />
      </DataRow>
    </div>
  );
}
