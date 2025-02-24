import { Staff } from '@/types/movies/movies';
import DataRow from '@shared/data/DataRow';
import Data from '@shared/data/Data';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import Link from 'next/link';
import { BoxOfficeMovieDetailForView } from '@/types/box-office/box-office';

export default MovieModal;

function MovieModal({ movie }: { movie: BoxOfficeMovieDetailForView }) {
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
        <div className="text-md sm:text-lg font-black">기본 정보</div>
        <DataRow>
          <Data title="영화명" content={movie.movieNm} />
        </DataRow>

        <DataRow className="hidden sm:flex">
          <Data title="장르" content={movie.genres} />
          <Data title="등급" content={movie.audit} />
        </DataRow>
        <DataRow className="flex sm:hidden">
          <Data title="장르" content={movie.genres} />
        </DataRow>
        <DataRow className="flex sm:hidden">
          <Data title="등급" content={movie.audit} />
        </DataRow>

        <DataRow className="hidden sm:flex">
          <Data
            title="개봉일"
            content={format(parseISO(movie.openDt), 'yyyy년 M월 d일')}
          />
          <Data title="상영시간" content={movie.runtime} />
        </DataRow>

        <DataRow className="flex sm:hidden">
          <Data
            title="개봉일"
            content={format(parseISO(movie.openDt), 'yyyy년 M월 d일')}
          />
        </DataRow>
        <DataRow className="flex sm:hidden">
          <Data title="상영시간" content={movie.runtime} />
        </DataRow>

        {movie.keywords && (
          <DataRow>
            <Data title="키워드" content={movie.keywords} />
          </DataRow>
        )}
        <DataRow>
          <Data title="줄거리" content={movie.plotText} />
        </DataRow>
        <DataRow>
          <Data title="제작국가" content={movie.nations} />
        </DataRow>
        {movie.awards.length > 0 && (
          <DataRow>
            <Data
              title="수상내역"
              content={
                <div>
                  {movie.awards.map((award) => (
                    <div key={award}>- {award}</div>
                  ))}
                </div>
              }
            />
          </DataRow>
        )}
      </div>

      {/* 참여 */}
      <div className="flex flex-col gap-1">
        <div className="text-md sm:text-lg font-black">참여</div>
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
          <div className="text-md sm:text-lg font-black">이미지</div>
          {movie.posters && (
            <DataRow>
              <Data
                title="포스터"
                contentClassName="overflow-x-auto gap-1"
                content={movie.posters.map((posterSrc) => (
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
                content={movie.stlls.map((stillSrc) => (
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
        <div className="text-md sm:text-lg font-black">통계</div>
        <DataRow className="hidden sm:flex">
          <Data
            title="누적관객수"
            content={`${Number(movie.audiAcc).toLocaleString()} 명`}
          />
          <Data
            title="누적매출액"
            content={`${Number(movie.salesAcc).toLocaleString()} 원`}
          />
        </DataRow>
        <DataRow className="flex sm:hidden">
          <Data
            title="누적관객수"
            content={`${Number(movie.audiAcc).toLocaleString()} 명`}
          />
        </DataRow>
        <DataRow className="flex sm:hidden">
          <Data
            title="누적매출액"
            content={`${Number(movie.salesAcc).toLocaleString()} 원`}
          />
        </DataRow>
      </div>
    </div>
  );
}
