'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Spacing20 from '@components/spacing/Spacing-20';
import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Spacing10 from '@components/spacing/Spacing-10';

interface BoxOfficeProps {
  data: {
    boxOfficeType: string;
    boxOfficeList: {
      rank: string;
      movieNm: string;
      poster: string;
      detail: any;
    }[];
    range: string;
  };
}

export default function BoxOffice({ data }: BoxOfficeProps) {
  const { boxOfficeType, boxOfficeList, range } = data;

  const rangeArr = range.split('~');

  const startDate = format(parseISO(rangeArr[0]), 'yyyy년 M월 d일 eeee', {
    locale: ko,
  });
  const endDate = format(parseISO(rangeArr[1]), 'yyyy년 M월 d일 eeee', {
    locale: ko,
  });

  const isDailyRange = startDate === endDate;

  return (
    <section>
      <span className="font-black text-3xl">{boxOfficeType}</span>
      &nbsp;
      <span className="font-black text-xl">
        ({isDailyRange ? startDate : startDate + ' ~ ' + endDate})
      </span>
      <Spacing20 />
      <Swiper spaceBetween={20} slidesPerView={5}>
        {boxOfficeList.map((movie) => (
          <SwiperSlide key={movie.movieNm}>
            <div className="flex justify-center border-solid border-2 border-black bg-white	rounded-lg p-6">
              <div className="absolute top-3 left-[-10px]">
                {RankNumber(Number(movie.rank))}
              </div>
              <div className="cursor-pointer">
                <Image
                  width={230}
                  height={330}
                  src={movie.poster}
                  alt={movie.movieNm}
                  className="rounded-lg max-h-[330px]"
                />
                <Spacing10 />
                <p className="text-sm">
                  <span
                    className={`inline-block rounded-md py-[2px] px-[6px] text-white font-black mt-1
                      ${
                        movie.detail.rating === '청소년관람불가'
                          ? 'bg-red-500'
                          : movie.detail.rating.includes('15세이상')
                            ? 'bg-amber-400'
                            : movie.detail.rating.includes('12세이상')
                              ? 'bg-blue-700'
                              : 'bg-green-600'
                      }`}
                  >
                    {movie.detail.rating === '청소년관람불가'
                      ? '19'
                      : movie.detail.rating.includes('15세이상')
                        ? '15'
                        : movie.detail.rating.includes('12세이상')
                          ? '12'
                          : 'ALL'}
                  </span>
                  &nbsp;
                  <span className="font-black">{movie.movieNm}</span>
                  <br />
                  <span>장르: {movie.detail.genre}</span>
                  <br />
                  <span>
                    감독: {movie.detail.directors.director[0].directorNm}
                  </span>
                  <br />
                  <span>
                    개봉일:{' '}
                    {format(
                      parseISO(movie.detail.repRlsDate),
                      'yyyy년 M월 d일',
                      {
                        locale: ko,
                      },
                    )}
                  </span>
                </p>
                <Spacing10 />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function RankNumber(rank: number) {
  let content;
  switch (rank) {
    case 1:
      content = (
        <polyline
          fill="none"
          points="84 64 132 32 132 224"
          stroke="#f15353"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="26"
        />
      );
      break;
    case 2:
      content = (
        <path
          d="M83.8,61.3A48,48,0,0,1,176,80a47.4,47.4,0,0,1-8.2,26.8h0L80,224h96"
          fill="none"
          stroke="#f15353"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="26"
        />
      );
      break;
    case 3:
      content = (
        <path
          d="M184,168A64,64,0,0,1,74.8,213.3a8,8,0,0,1,11.3-11.4A47.9,47.9,0,1,0,120,120a8.1,8.1,0,0,1-7.1-4.3,7.8,7.8,0,0,1,.6-8.3L160.6,40H80a8,8,0,0,1,0-16h96a8.1,8.1,0,0,1,7.1,4.3,7.8,7.8,0,0,1-.6,8.3l-48.2,69A64.1,64.1,0,0,1,184,168Z"
          fill="#f15353"
          stroke="#f15353"
          strokeWidth="10"
        />
      );
      break;
    case 4:
      content = (
        <>
          <polyline
            fill="none"
            points="124 24 76 160 172 160"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="172"
            x2="172"
            y1="96"
            y2="224"
          />
        </>
      );
      break;
    case 5:
      content = (
        <path
          d="M176,32H95.7L80,128.4a56.4,56.4,0,0,1,79.5,0,55.8,55.8,0,0,1,0,79.2,56.4,56.4,0,0,1-79.5,0"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
      );
      break;
    case 6:
      content = (
        <>
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="79.5"
            x2="144"
            y1="140"
            y2="32"
          />
          <circle
            cx="128"
            cy="168"
            fill="none"
            r="56"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </>
      );
      break;
    case 7:
      content = (
        <polyline
          fill="none"
          points="80 40 176 40 112 232"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="8"
        />
      );
      break;
    case 8:
      content = (
        <>
          <path
            d="M178.8,71.7a46.3,46.3,0,0,1-14.9,33.7,53.3,53.3,0,0,1-71.8,0,45.6,45.6,0,0,1,0-67.4,53,53,0,0,1,71.8,0A46,46,0,0,1,178.8,71.7Z"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
          <path
            d="M188,175.7a54.4,54.4,0,0,1-17.6,39.8,62.7,62.7,0,0,1-84.8,0,53.9,53.9,0,0,1,0-79.7,62.7,62.7,0,0,1,84.8,0A54.4,54.4,0,0,1,188,175.7Z"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </>
      );
      break;
    case 9:
      content = (
        <>
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
            x1="176.5"
            x2="111.7"
            y1="116"
            y2="224"
          />
          <circle
            cx="128"
            cy="88"
            fill="none"
            r="56"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </>
      );
      break;
    case 10:
      content = (
        <>
          <polyline
            fill="none"
            points="84 64 132 32 132 224"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
          <ellipse
            cx="228"
            cy="128"
            fill="none"
            rx="72"
            ry="104"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </>
      );
      break;
    default:
      content = <></>;
  }

  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      width={75}
      height={50}
    >
      <rect fill="none" height="256" width="256" />
      {content}
    </svg>
  );
}
