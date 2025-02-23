import {
  CompanyResponseCompanyFilmo,
  CompanyResponseCompanyInfoFilmoListForView,
} from '@/types/companies/company';
import DataRow from '@shared/data/DataRow';
import Data from '@shared/data/Data';

export default CompanyFilmosInfo;

interface CompanyFilmosInfoProps {
  data: {
    filmosInfo: CompanyResponseCompanyFilmo[];
  };
}

function CompanyFilmosInfo({ data }: CompanyFilmosInfoProps) {
  const { filmosInfo } = data;

  const initFilmos: CompanyResponseCompanyInfoFilmoListForView = [];

  const groupFilmos = filmosInfo.reduce((accumulator, currentValue) => {
    const alreadyExistFilmoIdx = accumulator.findIndex(
      (acc) => acc.movieCd === currentValue.movieCd,
    );

    if (alreadyExistFilmoIdx >= 0) {
      accumulator[alreadyExistFilmoIdx].companyPartNm = [
        ...accumulator[alreadyExistFilmoIdx].companyPartNm,
        currentValue.companyPartNm,
      ];
    } else {
      accumulator.push({
        ...currentValue,
        companyPartNm: [currentValue.companyPartNm],
      });
    }

    return accumulator;
  }, initFilmos);

  if (!groupFilmos.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-black">필모</div>
      {groupFilmos.map((filmo) => (
        <DataRow key={filmo.movieCd}>
          <Data title="영화" content={filmo.movieNm} />
          <Data title="참여" content={filmo.companyPartNm.join(' | ')} />
        </DataRow>
      ))}
    </div>
  );
}
