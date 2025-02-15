import { ReactNode, Ref } from 'react';

export default TableBodyRow;

interface TableBodyRowProps {
  children: ReactNode;
  ref?: Ref<HTMLTableRowElement>;
}

function TableBodyRow(props: TableBodyRowProps) {
  const { children, ref } = props;

  return (
    <tr
      ref={ref}
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
