'use client';

import useModalStore, { getModalDefaultValue } from '@/stores/useModalStore';
import Modal from '@shared/modal/Modal';

export default ExchangeModal;

function ExchangeModal() {
  const { setModal, getModal } = useModalStore();

  const { open, title, content, onButtonClick } = getModal();

  return (
    <Modal
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
