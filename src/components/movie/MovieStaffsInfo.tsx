import { Staff } from '@/types/movies';
import DataRow from '@shared/data/DataRow';
import Data from '@shared/data/Data';

export default MovieStaffsInfo;

interface MovieStaffsInfoProps {
  data: {
    staffs: Staff[];
  };
}

function MovieStaffsInfo({ data }: MovieStaffsInfoProps) {
  const { staffs } = data;

  const roleGroups = [...new Set(staffs.map((s) => s.staffRoleGroup))];

  const staffListByRoleGroup: { [key: string]: Staff[] } = {};

  roleGroups.forEach((role) => {
    staffListByRoleGroup[role] = staffs.filter(
      (s) => s.staffRoleGroup === role,
    );
  });

  if (roleGroups.length === 0 || (roleGroups.length === 1 && !roleGroups[0])) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="text-lg font-black">참여</div>
      {roleGroups.map((roleGroup) => (
        <DataRow key={roleGroup}>
          <Data
            title={roleGroup}
            content={staffListByRoleGroup[roleGroup]
              .map(
                (staffs) =>
                  staffs.staffNm +
                  `${staffs.staffRole && '(' + staffs.staffRole + ')'}`,
              )
              .join(',')}
          />
        </DataRow>
      ))}
    </div>
  );
}
