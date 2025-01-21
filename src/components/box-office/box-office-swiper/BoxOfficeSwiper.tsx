'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import BoxOfficeSwiperCardRank from '@components/box-office/box-office-swiper/BoxOfficeSwiperCardRank';
import BoxOfficeSwiperCardPoster from '@components/box-office/box-office-swiper/BoxOfficeSwiperCardPoster';
import BoxOfficeSwiperCardContent from '@components/box-office/box-office-swiper/BoxOfficeSwiperCardContent';
import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { BoxOfficeItemForView } from '@/types/box-office';
import { Staff } from '@/types/movies';
import useScreenStore from '@/stores/useScreenStore';
import useModalStore from '@/stores/useModalStore';
import Data from '@shared/data/Data';
import DataRow from '@shared/data/DataRow';

export default BoxOfficeSwiper;

interface BoxOfficeCardSwiperProps {
  data: {
    boxOfficeList: BoxOfficeItemForView[];
  };
}

function ContentWrapper({ children }: { children: ReactNode }) {
  const innerWidth = useScreenStore((s) => s.getScreenSize().width);

  return (
    <>
      {innerWidth ? (
        <Swiper
          spaceBetween={20}
          direction={innerWidth <= 856 ? 'vertical' : 'horizontal'}
          slidesPerView={
            innerWidth &&
            (innerWidth > 2094 || (innerWidth > 1024 && innerWidth < 1576)
              ? 4
              : 3)
          }
          className="h-[calc(100%_-_56px)] xl:h-fit"
        >
          {children}
        </Swiper>
      ) : (
        <div></div>
      )}
    </>
  );
}

function BoxOfficeSwiper({ data }: BoxOfficeCardSwiperProps) {
  const { boxOfficeList } = data;

  const { setModal } = useModalStore();

  const handleSwiperSlide = (movie: BoxOfficeItemForView) => {
    setModal({
      open: true,
      title: `[${movie.movieNm}] 영화 정보`,
      content: <MovieDetailModalContent movie={movie} />,
    });
  };

  return (
    <ContentWrapper>
      {boxOfficeList.map((movie) => (
        <SwiperSlide
          key={movie.movieNm}
          className="min-h-[128px]"
          onClick={() => {
            handleSwiperSlide(movie);
          }}
        >
          <div
            className="
              cursor-pointer
              bg-white
              h-full
              border-solid border-2 border-black
              rounded-lg
              sm:flex
              sm:flex-col
              sm:gap-[10px]
              sm:p-3
              xl:flex-row
            "
          >
            <BoxOfficeSwiperCardRank data={{ rank: Number(movie.rank) }} />
            <BoxOfficeSwiperCardPoster
              data={{
                posterSrc: movie.detail.posters.split('|')[0],
                movieNm: movie.movieNm,
              }}
            />
            <BoxOfficeSwiperCardContent data={{ movie }} />
          </div>
        </SwiperSlide>
      ))}
    </ContentWrapper>
  );
}

function MovieDetailModalContent({ movie }: { movie: BoxOfficeItemForView }) {
  // ['감독', '출연', '촬영', '미술팀', '제작사', '투자사', '배급사']
  const roleGroups = [
    ...new Set(movie.detail.staffs.staff.map((s) => s.staffRoleGroup)),
  ];

  const staffListByRoleGroup: { [key: string]: Staff[] } = {};

  roleGroups.forEach((role) => {
    staffListByRoleGroup[role] = movie.detail.staffs.staff.filter(
      (s) => s.staffRoleGroup === role,
    );
  });

  return (
    <div className="flex flex-col gap-5">
      {/* 기본 정보 */}
      <div className="flex flex-col gap-1">
        <div className="text-lg font-black">기본 정보</div>
        <DataRow>
          <Data title="영화명" content={movie.movieNm} />
        </DataRow>
        <DataRow>
          <Data title="장르" content={movie.detail.genre} />
          <Data title="등급" content={movie.detail.rating} />
        </DataRow>
        <DataRow>
          <Data
            title="개봉일"
            content={format(
              parseISO(movie.detail.repRlsDate),
              'yyyy년 M월 d일',
            )}
          />
          <Data title="상영시간" content={`${movie.detail.runtime} 분`} />
        </DataRow>
        {movie.detail.keywords && (
          <DataRow>
            <Data title="키워드" content={movie.detail.keywords} />
          </DataRow>
        )}
        <DataRow>
          <Data title="줄거리" content={movie.detail.plots.plot[0].plotText} />
        </DataRow>
        <DataRow>
          <Data title="제작국가" content={movie.detail.nation} />
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
      {(movie.detail.posters || movie.detail.stlls) && (
        <div className="flex flex-col gap-1">
          <div className="text-lg font-black">이미지</div>
          {movie.detail.posters && (
            <DataRow>
              <Data
                title="포스터"
                contentClassName="overflow-x-auto gap-1"
                content={movie.detail.posters.split('|').map((posterSrc) => (
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

          {movie.detail.stlls && (
            <DataRow>
              <Data
                title="스틸"
                contentClassName="overflow-x-auto gap-1"
                content={movie.detail.stlls.split('|').map((stillSrc) => (
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
            content={`${Number(movie.audiAcc).toLocaleString()} 명`}
          />
          <Data
            title="누적매출액"
            content={`${Number(movie.salesAcc).toLocaleString()} 원`}
          />
        </DataRow>
      </div>
    </div>
  );
}
