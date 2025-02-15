'use client'; // Error boundaries must be Client Components

import Button from '@shared/button/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <div className="absolute lef-0 right-0 top-0 bottom-0 w-full flex flex-col justify-center items-center gap-[20px] bg-white p-5">
      {' '}
      <span className="text-center text-xl font-black">
        일시적인 오류로 서비스 접속에 실패했습니다.
        <br />
        잠시 후 다시 시도해 주세요.
      </span>
      <Button className="bg-red-500" onClick={reset}>
        다시 시도
      </Button>
    </div>
  );
}
