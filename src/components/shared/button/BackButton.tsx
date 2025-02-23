'use client';

import { useRouter } from 'next/navigation';
import Button from '@shared/button/Button';

export default BackButton;

function BackButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <Button onClick={() => router.back()} />
    </div>
  );
}
