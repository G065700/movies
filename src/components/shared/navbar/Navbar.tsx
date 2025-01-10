'use client';

import Link from 'next/link';
import { create } from 'zustand';
import { Menu, menus } from '@components/shared/navbar/menus';
import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default Navbar;

function Navbar() {
  const { d, h } = useLogic();
  const { selectedMenu } = d;
  const { handleMenu } = h;

  const pathname = usePathname();

  useEffect(() => {
    const targetMenu = menus.find((menu) => menu.path === pathname);
    targetMenu && handleMenu(targetMenu);
  }, [pathname, handleMenu]);

  return (
    <nav className="bg-white w-full flex justify-between p-5">
      {/* Logo */}
      <Link href="/" className="text-4xl">
        MOVIE
      </Link>

      {/* menu list */}
      <ul className="flex items-center gap-5 text-3xl">
        {menus.map((menu) => (
          <li
            key={menu.path}
            onClick={() => {
              handleMenu(menu);
            }}
          >
            <Link
              href={menu.path}
              className={selectedMenu?.path === menu.path ? 'font-black' : ''}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function useLogic() {
  const { selectedMenu, setSelectedMenu } = useStore();

  const handleMenu = useCallback(
    (selectedMenu: Menu) => {
      setSelectedMenu(selectedMenu);
    },
    [setSelectedMenu],
  );

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
  selectedMenu: Menu | null;
  setSelectedMenu: (selectedMenu: Menu) => void;
}

const useStore = create<Store>((set) => {
  return {
    selectedMenu: null,
    setSelectedMenu: (selectedMenu: Menu) => {
      set({
        selectedMenu,
      });
    },
  };
});
