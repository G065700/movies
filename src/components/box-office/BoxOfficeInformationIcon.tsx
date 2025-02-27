'use client';

import { useState } from 'react';

export default BoxOfficeInformationIcon;

interface BoxOfficeSectionInformationIconProps {
  data: {
    isDailyRange: boolean;
  };
}

function BoxOfficeInformationIcon({
  data,
}: BoxOfficeSectionInformationIconProps) {
  const { isDailyRange } = data;

  const [mouseOver, setMouseOver] = useState<boolean>(false);

  const guidance = getBoxOfficeSectionInformationGuidance(isDailyRange);

  return (
    <div className="flex-1 relative">
      <svg
        version="1.1"
        viewBox="0 0 16 16"
        width={30}
        className="cursor-pointer"
        onMouseOver={() => {
          setMouseOver(true);
        }}
        onMouseLeave={() => {
          setMouseOver(false);
        }}
      >
        <g id="Guide" />
        <g id="Layer_2">
          <g>
            <path d="M8,2C4.69,2,2,4.69,2,8s2.69,6,6,6s6-2.69,6-6S11.31,2,8,2z M8,13c-2.76,0-5-2.24-5-5s2.24-5,5-5s5,2.24,5,5    S10.76,13,8,13z" />
            <path d="M8,6.85c-0.28,0-0.5,0.22-0.5,0.5v3.4c0,0.28,0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5v-3.4C8.5,7.08,8.28,6.85,8,6.85z" />
            <path d="M8.01,4.8C7.75,4.78,7.51,5.05,7.5,5.32c0,0.01,0,0.07,0,0.08c0,0.27,0.21,0.47,0.49,0.48c0,0,0.01,0,0.01,0    c0.27,0,0.49-0.24,0.5-0.5c0-0.01,0-0.11,0-0.11C8.5,4.98,8.29,4.8,8.01,4.8z" />
          </g>
        </g>
      </svg>
      <div
        className={`bg-black text-white text-xs p-3 rounded-lg absolute z-10 w-fit ${mouseOver ? 'block' : 'hidden'}`}
      >
        {guidance}
      </div>
    </div>
  );
}

function getBoxOfficeSectionInformationGuidance(isDailyRange: boolean) {
  return isDailyRange ? (
    <>
      어제의 박스오피스 영화 1 ~ 10위
      <br />
      <br />* 00:05에 업데이트됩니다.
    </>
  ) : (
    <>
      지난 월요일부터 일요일까지의 박스오피스 영화 1 ~ 10위
      <br />
      <br />* 매주 월요일 00:05에 업데이트됩니다.
    </>
  );
}
