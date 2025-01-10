import { ReactNode } from 'react';

export default DataRow;

function DataRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex border-solid border-[1px] border-black box-border rounded-lg overflow-hidden">
      {children}
    </div>
  );
}
