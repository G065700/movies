export default BoxOfficeRating;

interface BoxOfficeRatingProps {
  data: {
    audit: string;
  };
}

export function BoxOfficeRating({ data }: BoxOfficeRatingProps) {
  const { audit } = data;

  let bgColor;
  let age;

  if (audit === '청소년관람불가') {
    bgColor = 'bg-red-500';
    age = '19';
  } else if (audit.includes('15세이상')) {
    bgColor = 'bg-amber-400';
    age = '15';
  } else if (audit.includes('12세이상')) {
    bgColor = 'bg-blue-700';
    age = '12';
  } else {
    bgColor = 'bg-green-600';
    age = 'ALL';
  }

  return (
    <span
      className={`inline-block w-fit rounded-md py-[2px] px-[6px] text-white font-black mr-1 ${bgColor}`}
    >
      {age}
    </span>
  );
}
