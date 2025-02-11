import React from 'react';

export default TableBodyRow;

interface TableBodyRowProps {
  children: React.ReactNode;
}

function TableBodyRow(props: TableBodyRowProps) {
  const { children } = props;

  return (
    <tr
      className={`
                block
                h-[40px]
                even:bg-slate-200
                odd:bg-white
                cursor-pointer
                hover:bg-gray-950 hover:text-white
              `}
    >
      {children}
    </tr>
  );
}
