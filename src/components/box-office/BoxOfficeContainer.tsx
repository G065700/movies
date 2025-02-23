import { ReactNode } from 'react';

export default BoxOfficeContainer;

function BoxOfficeContainer({ children }: { children: ReactNode }) {
  return <div className="h-full">{children}</div>;
}
