import Dimmed from '@components/shared/modal/Dimmed';
import { ReactNode } from 'react';

export default Modal;

interface ModalProps {
  open: boolean;
  title: ReactNode;
  content: ReactNode;
  buttonLabel?: string;
  onButtonClick: () => void;
}

function Modal({
  open,
  title,
  content,
  buttonLabel = '확인',
  onButtonClick,
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <Dimmed>
      <div className="w-[80%] max-w-[820px] absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4 bg-white flex flex-col gap-5 z-20 border-solid border-2 border-black rounded-xl p-4">
        <div className="text-xl font-black">{title}</div>
        <div className="max-h-[70dvh] overflow-auto pr-1">{content}</div>
        <div className="flex justify-center">
          <button
            onClick={onButtonClick}
            className="w-fit bg-blue-500 px-4 py-2 rounded-lg text-white"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </Dimmed>
  );
}
