'use client';

import { useRouter } from 'next/navigation';

export default BackButton;

function BackButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <button
        className="w-fit px-4 py-2 bg-blue-500 rounded-lg text-white font-black"
        onClick={() => router.back()}
      >
        뒤로 가기
      </button>
    </div>
  );
}
