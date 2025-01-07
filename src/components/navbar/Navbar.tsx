'use client';

import Link from 'next/link';
import { create } from 'zustand';

export default Navbar;

function Navbar() {
  const { d, h } = useLogic();
  const { selectedMenu } = d;
  const { handleMenu } = h;

  return (
    <nav className="relative z-10 w-full text-white bg-sky-500">
      <div className="flex justify-between items-center mx-5 ">
        {/* Logo */}
        <div className="flex items-center text-2xl h-14">
          <Link href="/" className="font-black">
            MOVIES
          </Link>
        </div>

        {/* 메뉴 */}
        <ul className="flex gap-5">
          <li
            onClick={() => {
              handleMenu('');
            }}
          >
            <Link
              href="/"
              className={selectedMenu === '' ? 'font-black text-blue-800' : ''}
            >
              홈
            </Link>
          </li>
          <li
            onClick={() => {
              handleMenu('box-office');
            }}
          >
            <Link
              href="/box-office"
              className={
                selectedMenu === 'box-office' ? 'font-black text-blue-800' : ''
              }
            >
              박스오피스
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function useLogic() {
  const { selectedMenu, setSelectedMenu } = useStore();

  const handleMenu = (selectedMenu: string) => {
    setSelectedMenu(selectedMenu);
  };

  const d = {
    selectedMenu,
  };

  const h = {
    handleMenu,
  };

  return {
    d,
    h,
  };
}

interface Store {
  selectedMenu: string;
  setSelectedMenu: (selectedMenu: string) => void;
}

const useStore = create<Store>((set) => {
  return {
    selectedMenu: '',
    setSelectedMenu: (selectedMenu: string) => {
      set({
        selectedMenu,
      });
    },
  };
});
