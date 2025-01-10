'use client';

import Link from 'next/link';
import { create } from 'zustand';

export default Navbar;

function Navbar() {
  const { d, h } = useLogic();
  const { selectedMenu } = d;
  const { handleMenu } = h;

  return (
    <nav className="relative z-10 w-full text-black bg-neutral-200">
      <div className="flex justify-between items-center mx-5 ">
        {/* Logo */}
        <div className="flex items-center h-24">
          <Link
            href="/"
            className="font-black bg-red-500 text-6xl border-4 border-black p-2"
          >
            {/*<svg*/}
            {/*  viewBox="0 0 24 24"*/}
            {/*  width={80}*/}
            {/*  xmlns="http://www.w3.org/2000/svg"*/}
            {/*>*/}
            {/*  <g data-name="44. Video" id="_44._Video">*/}
            {/*    <rect height="16" rx="2" width="17" y="4" />*/}
            {/*    <path d="M23.46,5.11a1,1,0,0,0-1.04.08L19,7.63v8.74l3.42,2.44A.939.939,0,0,0,23,19a1.072,1.072,0,0,0,.46-.11A1,1,0,0,0,24,18V6A1,1,0,0,0,23.46,5.11Z" />*/}
            {/*  </g>*/}
            {/*</svg>*/}
            MOVIE
          </Link>
        </div>

        {/* 메뉴 */}
        <ul className="flex gap-5 text-2xl">
          <li
            onClick={() => {
              handleMenu('');
            }}
          >
            <Link href="/" className={selectedMenu === '' ? 'font-black' : ''}>
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
              className={selectedMenu === 'box-office' ? 'font-black' : ''}
            >
              박스오피스
            </Link>
          </li>
          <li
            onClick={() => {
              handleMenu('search');
            }}
          >
            <Link
              href="/movies"
              className={selectedMenu === 'search' ? 'font-black' : ''}
            >
              영화검색
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
