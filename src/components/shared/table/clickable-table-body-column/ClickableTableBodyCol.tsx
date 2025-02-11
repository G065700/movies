import Link from 'next/link';
import React from 'react';

export default ClickableTableBodyCol;

interface ClickableTableBodyColProps {
  data: {
    href: string;
    tdStyle?: string;
    linkStyle?: string;
  };
  children: React.ReactNode;
}

function ClickableTableBodyCol(props: ClickableTableBodyColProps) {
  const {
    data: { href, tdStyle, linkStyle },
    children,
  } = props;

  return (
    <td className={`inline-block h-full ${tdStyle}`}>
      <Link
        href={href}
        className={`block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap ${linkStyle}`}
      >
        {children}
      </Link>
    </td>
  );
}
