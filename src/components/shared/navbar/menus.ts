export type Menu = {
  name: string;
  path: string;
};

export type Menus = Menu[];

export const menus: Menus = [
  {
    name: '박스오피스',
    path: '/',
  },
  {
    name: '영화목록',
    path: '/movies',
  },
  {
    name: '영화인목록',
    path: '/makers',
  },
];
