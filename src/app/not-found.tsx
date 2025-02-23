import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="absolute lef-0 right-0 top-0 bottom-0 w-full flex flex-col justify-center items-center gap-[20px] bg-white p-5">
      <span className="text-center text-xl font-black">
        페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
      </span>
      <Link
        className="flex justify-center items-center w-[130px] h-[36px] rounded-lg text-white font-semibold bg-red-500"
        href="/"
      >
        메인 화면으로 이동
      </Link>
    </div>
  );
}
