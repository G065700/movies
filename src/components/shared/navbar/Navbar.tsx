'use client';

import Link from 'next/link';
import { create } from 'zustand';
import { Menu, menus } from '@components/shared/navbar/menus';
import { Fragment, useCallback, useEffect } from 'react';
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
    <nav
      className="
        fixed
        w-[180px]
        h-[100dvh]
        flex flex-col gap-[50px]
        bg-white
        p-5
     "
    >
      <Link
        href="/"
        className="text-3xl font-black text-white bg-black p-2 rounded-lg text-center"
      >
        MOVIE
      </Link>
      {/* menu list */}
      <ul className="flex flex-col items-start gap-5 text-xl">
        {menus.map((menu) => (
          <Fragment key={menu.name}>
            {!menu.depth2Menus && (
              <li
                onClick={() => {
                  handleMenu(menu);
                }}
              >
                <Link
                  href={menu.path}
                  className={
                    selectedMenu?.path === menu.path ? 'font-black' : ''
                  }
                >
                  {menu.name}
                </Link>
              </li>
            )}
            {menu.depth2Menus && (
              <>
                <li key={menu.name}>{menu.name}</li>
                {menu.depth2Menus.map((depth2Menu) => (
                  <li
                    key={depth2Menu.name}
                    className="ml-3"
                    onClick={() => {
                      handleMenu(depth2Menu);
                    }}
                  >
                    <Link
                      href={depth2Menu.path}
                      className={
                        selectedMenu?.path === depth2Menu.path
                          ? 'font-black'
                          : ''
                      }
                    >
                      - {depth2Menu.name}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </Fragment>
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
