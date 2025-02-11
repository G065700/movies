'use client';

import { Fragment, useState, useCallback, useEffect } from 'react';
import { Menu, menus } from '@shared/nav/menus';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useScreenStore from '@/stores/useScreenStore';

export default MobileMenuButton;

function MobileMenuButton() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const innerWidth = useScreenStore((s) => s.getScreenSize().width);

  const pathname = usePathname();

  const handleMenuButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenu = useCallback(
    (selectedMenu: Menu) => {
      setSelectedMenu(selectedMenu);
      setShowMenu(false);
    },
    [setSelectedMenu],
  );

  useEffect(() => {
    let targetMenu = menus.find((menu) => menu.path === pathname);

    if (!targetMenu) {
      const depth1Menus = menus.filter((menu) => menu.depth2Menus);
      depth1Menus.forEach((depth1Menu) => {
        targetMenu = depth1Menu.depth2Menus?.find(
          (depth2Menu) => depth2Menu.path === pathname,
        );
      });
    }

    targetMenu && handleMenu(targetMenu);
  }, [pathname, handleMenu]);

  useEffect(() => {
    if (innerWidth > 856) {
      setShowMenu(false);
    }
  }, [innerWidth]);

  return (
    <div className="sm:hidden">
      <button
        onClick={handleMenuButtonClick}
        className="fixed right-[20px] bottom-[20px] bg-blue-500 h-[60px] w-[60px] rounded-full z-50"
      >
        <MobileMenuIcon />
      </button>
      {showMenu && (
        <nav className="fixed bottom-[85px] right-[10px] bg-gray-200 rounded-xl p-5 z-50 border-solid border-2 border-black">
          <ul className="flex flex-col items-start gap-2 text-lg">
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
      )}
    </div>
  );
}

function MobileMenuIcon() {
  return (
    <svg
      height="32px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 32 32"
      width="60px"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
    </svg>
  );
}
