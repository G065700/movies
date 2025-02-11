import { MakerResponsePeopleInfoForDefaultInfo } from '@/types/makers/maker';
import Data from '@shared/data/Data';
import DataRow from '@shared/data/DataRow';

export default MakerDefaultInfo;

interface MakerDefaultInfoProps {
  data: {
    defaultInfo: MakerResponsePeopleInfoForDefaultInfo;
  };
}

function MakerDefaultInfo({ data }: MakerDefaultInfoProps) {
  const { defaultInfo } = data;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-black">기본 정보</div>
      <DataRow>
        <Data title="영화인명" content={defaultInfo.peopleNm} />
        <Data
          title={<span className="text-pretty">영화인명(영문)</span>}
          content={defaultInfo.peopleNmEn}
        />
      </DataRow>
      <DataRow>
        <Data title="성별" content={defaultInfo.sex} />
        <Data title="분류" content={defaultInfo.repRoleNm} />
      </DataRow>
    </div>
  );
}
