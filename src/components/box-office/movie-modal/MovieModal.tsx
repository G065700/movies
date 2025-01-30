import { KmdbMovieInfo, Staff } from '@/types/movies';
import DataRow from '@shared/data/DataRow';
import Data from '@shared/data/Data';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import Link from 'next/link';

export default MovieModal;

function MovieModal({
  movie,
  movieNm,
  audiAcc,
  salesAcc,
}: {
  movie: KmdbMovieInfo;
  movieNm: string;
  audiAcc: string;
  salesAcc: string;
}) {
  const roleGroups = [
    ...new Set(movie.staffs.staff.map((s) => s.staffRoleGroup)),
  ];

  const staffListByRoleGroup: { [key: string]: Staff[] } = {};

  roleGroups.forEach((role) => {
    staffListByRoleGroup[role] = movie.staffs.staff.filter(
      (s) => s.staffRoleGroup === role,
    );
  });

  return (
    <div className="flex flex-col gap-5">
      {/* 기본 정보 */}
      <div className="flex flex-col gap-1">
        <div className="text-lg font-black">기본 정보</div>
        <DataRow>
          <Data title="영화명" content={movieNm} />
        </DataRow>
        <DataRow>
          <Data title="장르" content={movie.genre} />
          <Data title="등급" content={movie.rating} />
        </DataRow>
        <DataRow>
          <Data
            title="개봉일"
            content={format(parseISO(movie.repRlsDate), 'yyyy년 M월 d일')}
          />
          <Data title="상영시간" content={`${movie.runtime} 분`} />
        </DataRow>
        {movie.keywords && (
          <DataRow>
            <Data title="키워드" content={movie.keywords} />
          </DataRow>
        )}
        <DataRow>
          <Data title="줄거리" content={movie.plots.plot[0].plotText} />
        </DataRow>
        <DataRow>
          <Data title="제작국가" content={movie.nation} />
        </DataRow>
      </div>

      {/* 참여 */}
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

      {/* 이미지 */}
      {(movie.posters || movie.stlls) && (
        <div className="flex flex-col gap-1">
          <div className="text-lg font-black">이미지</div>
          {movie.posters && (
            <DataRow>
              <Data
                title="포스터"
                contentClassName="overflow-x-auto gap-1"
                content={movie.posters.split('|').map((posterSrc) => (
                  <Link href={posterSrc} target="_blank" key={posterSrc}>
                    <Image
                      width={400}
                      height={550}
                      src={posterSrc}
                      alt="poster"
                      className="rounded-lg max-h-[550px] cursor-pointer"
                      quality={100}
                    />
                  </Link>
                ))}
              />
            </DataRow>
          )}

          {movie.stlls && (
            <DataRow>
              <Data
                title="스틸"
                contentClassName="overflow-x-auto gap-1"
                content={movie.stlls.split('|').map((stillSrc) => (
                  <Link href={stillSrc} target="_blank" key={stillSrc}>
                    <Image
                      width={400}
                      height={550}
                      src={stillSrc}
                      alt="poster"
                      className="rounded-lg max-h-[550px] cursor-pointer"
                      quality={100}
                    />
                  </Link>
                ))}
              />
            </DataRow>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <div className="text-lg font-black">통계</div>
        <DataRow>
          <Data
            title="누적관객수"
            content={`${Number(audiAcc).toLocaleString()} 명`}
          />
          <Data
            title="누적매출액"
            content={`${Number(salesAcc).toLocaleString()} 원`}
          />
        </DataRow>
      </div>
    </div>
  );
}
