'use client';

import useModalStore, { getModalDefaultValue } from '@/stores/useModalStore';
import ScrollModal from '@shared/modal/ScrollModal';

export default Modal;

function Modal() {
  const { setModal, getModal } = useModalStore();

  const { open, title, content, onButtonClick } = getModal();

  return (
    <ScrollModal
      open={open}
      title={title}
      content={content}
      onButtonClick={() => {
        if (onButtonClick) {
          onButtonClick();
        }
        setModal(getModalDefaultValue());
      }}
    />
  );
}
