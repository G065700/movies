import { create } from 'zustand';
import { ReactNode } from 'react';

type Modal = {
  open: boolean;
  title: ReactNode;
  content: ReactNode;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

type UseModalStore = {
  modal: Modal;
  setModal: ({
    open,
    title,
    content,
    buttonLabel,
    onButtonClick,
  }: Modal) => void;
  getModal: () => Modal;
};

export function getModalDefaultValue() {
  return { open: false, title: '', content: '' };
}

const store = create<UseModalStore>((set, get) => {
  return {
    modal: getModalDefaultValue(),
    setModal: ({ open, title, content, buttonLabel, onButtonClick }) =>
      set({ modal: { open, title, content, buttonLabel, onButtonClick } }),
    getModal: () => get().modal,
  };
});

export default store;
