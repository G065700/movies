import {
  MakerResponsePeopleInfoFilmo,
  MakerResponsePeopleInfoFilmoListForView,
} from '@/types/maker';
import Data from '@shared/data/Data';
import DataRow from '@shared/data/DataRow';

export default MakerFilmosInfo;

interface MakerFilmosInfoProps {
  data: {
    filmosInfo: MakerResponsePeopleInfoFilmo[];
  };
}

function MakerFilmosInfo({ data }: MakerFilmosInfoProps) {
  const { filmosInfo } = data;

  const initFilmos: MakerResponsePeopleInfoFilmoListForView = [];

  const groupFilmos = filmosInfo.reduce((accumulator, currentValue) => {
    const alreadyExistFilmoIdx = accumulator.findIndex(
      (acc) => acc.movieCd === currentValue.movieCd,
    );

    if (alreadyExistFilmoIdx >= 0) {
      accumulator[alreadyExistFilmoIdx].moviePartNm = [
        ...accumulator[alreadyExistFilmoIdx].moviePartNm,
        currentValue.moviePartNm,
      ];
    } else {
      accumulator.push({
        ...currentValue,
        moviePartNm: [currentValue.moviePartNm],
      });
    }

    return accumulator;
  }, initFilmos);

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-black">필모</div>
      {groupFilmos.map((filmo) => (
        <DataRow key={filmo.movieCd}>
          <Data title="참여영화" content={filmo.movieNm} />
          <Data title="참여분야" content={filmo.moviePartNm.join(' | ')} />
        </DataRow>
      ))}
    </div>
  );
}
