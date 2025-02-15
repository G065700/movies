'use client';

import Link from 'next/link';
import { create } from 'zustand';
import { Menu, menus } from '@shared/nav/menus';
import { Fragment, useCallback, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';

export default Navbar;

function Navbar() {
  const { d, h } = useLogic();
  const { selectedMenu } = d;
  const { handleMenu } = h;

  const pathname = usePathname();
  const pathnameArr = useMemo(
    () => pathname.split('/').filter((pn) => pn),
    [pathname],
  );

  useEffect(() => {
    let targetMenu = menus.find((menu) => pathnameArr.includes(menu.path));

    if (!targetMenu) {
      const depth2Menus = menus.flatMap((depth1Menu) => depth1Menu.depth2Menus);
      targetMenu = depth2Menus.find(
        (depth2Menu) => depth2Menu && depth2Menu.path.includes(pathnameArr[0]),
      );

      if (!targetMenu && pathname === '/') {
        targetMenu = depth2Menus.find((depth2Menu) => depth2Menu?.path === '/');
      }
    }

    if (targetMenu) {
      handleMenu(targetMenu);
    }
  }, [pathname, pathnameArr, handleMenu]);

  return (
    <nav
      className={`
        hidden sm:fixed
        sm:w-[180px]
        sm:h-[100dvh]
        sm:flex sm:flex-col sm:gap-[50px]
        sm:bg-white
        sm:p-5
      `}
    >
      <Link
        href="/"
        className="text-3xl font-black text-white bg-black p-2 rounded-lg text-center"
      >
        MOVIES
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
                  className={`flex items-center gap-2 ${selectedMenu?.path === menu.path ? 'font-black' : ''}`}
                >
                  {menu.icon}
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
                      className={`flex items-center gap-2 ${selectedMenu?.path === depth2Menu.path ? 'font-black' : ''}`}
                    >
                      {depth2Menu.icon}
                      {depth2Menu.name}
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
