import Link from 'next/link';
import React from 'react';

export default ClickableTableBodyColHeader;

interface ClickableTableBodyColHeaderProps {
  data: {
    href: string;
    thStyle?: string;
    linkStyle?: string;
  };
  children: React.ReactNode;
}

function ClickableTableBodyColHeader(props: ClickableTableBodyColHeaderProps) {
  const {
    data: { href, thStyle, linkStyle },
    children,
  } = props;

  return (
    <th className={`inline-block h-full ${thStyle}`}>
      <Link
        href={href}
        className={`block w-full h-full leading-[40px] overflow-hidden text-ellipsis whitespace-nowrap ${linkStyle}`}
      >
        {children}
      </Link>
    </th>
  );
}
