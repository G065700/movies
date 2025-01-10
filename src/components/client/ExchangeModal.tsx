'use client';

import useModalStore, { getModalDefaultValue } from '@/stores/useModalStore';
import Modal from '@shared/modal/Modal';

export default ExchangeModal;

function ExchangeModal() {
  const { setModal, getModal } = useModalStore();

  const { open, title, content, buttonLabel, onButtonClick } = getModal();

  return (
    <Modal
      open={open}
      title={title}
      content={content}
      buttonLabel={buttonLabel}
      onButtonClick={() => {
        if (onButtonClick) {
          onButtonClick();
        }
        setModal(getModalDefaultValue());
      }}
    />
  );
}
