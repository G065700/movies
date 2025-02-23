import { ReactNode } from 'react';

export default TableBody;

function TableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="block max-h-[calc(100dvh_-_295px)] overflow-y-auto">
      {children}
    </tbody>
  );
}
