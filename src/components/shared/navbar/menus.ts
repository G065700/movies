export type Menu = {
  name: string;
  path: string;
};

export type Menus = Menu[];

export const menus: Menus = [
  {
    name: '오늘의 영화',
    path: '/',
  },
  {
    name: '박스오피스',
    path: '/box-office',
  },
  {
    name: '영상검색',
    path: '/movies',
  },
];
