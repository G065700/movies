import Dimmed from '@components/shared/modal/Dimmed';
import { ReactNode } from 'react';
import Button from '@shared/button/Button';

export default ScrollModal;

interface ModalProps {
  open: boolean;
  title: ReactNode;
  content: ReactNode;
  onButtonClick: () => void;
}

function ScrollModal({ open, title, content, onButtonClick }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <Dimmed>
      <div className="w-[80%] max-w-[820px] absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 bg-white flex flex-col gap-5 z-20 border-solid border-2 border-black rounded-xl p-4">
        <div className="text-xl font-black">{title}</div>
        <div className="max-h-[70dvh] overflow-auto pr-1">{content}</div>
        <div className="flex justify-center">
          <Button onClick={onButtonClick} />
        </div>
      </div>
    </Dimmed>
  );
}
