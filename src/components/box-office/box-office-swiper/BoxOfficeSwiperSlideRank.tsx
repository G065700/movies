export default BoxOfficeSwiperSlideRank;

interface BoxOfficeCardRankProps {
  data: {
    rank: number;
  };
}

function BoxOfficeSwiperSlideRank({ data }: BoxOfficeCardRankProps) {
  const { rank } = data;

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
      className="
        absolute
        w-[70px]
        left-1 top-1/2 -translate-y-2/4
        sm:left-[-10px] sm:w-[75px] sm:top-3 sm:translate-y-0
        xl:left-auto xl:right-1 xl:top-auto xl:bottom-3
      "
    >
      <rect fill="none" height="256" width="256" />
      {content}
    </svg>
  );
}
