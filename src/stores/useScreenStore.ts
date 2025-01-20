import { create } from 'zustand';

type ScreenSize = { width: number; height: number };

type UseScreenStore = {
  screenSize: ScreenSize;
  setScreenSize: (width: number, height: number) => void;
  getScreenSize: () => ScreenSize;
};

function getDefaultValue() {
  return { width: 0, height: 0 };
}

const store = create<UseScreenStore>((set, get) => {
  return {
    screenSize: getDefaultValue(),
    setScreenSize: (width, height) => set({ screenSize: { width, height } }),
    getScreenSize: () => get().screenSize,
  };
});

export default store;
