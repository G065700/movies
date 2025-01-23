export type Menu = {
  name: string;
  path: string;
  depth2Menus?: Menu[];
};

export type Menus = Menu[];

export const menus: Menus = [
  {
    name: '박스오피스',
    path: '/',
  },
  {
    name: '목록',
    path: '',
    depth2Menus: [
      {
        name: '영화',
        path: '/movies',
      },
      {
        name: '영화인',
        path: '/makers',
      },
    ],
  },
];
