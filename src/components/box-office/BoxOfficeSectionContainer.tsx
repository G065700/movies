import { ReactNode } from 'react';

export default BoxOfficeSectionContainer;

function BoxOfficeSectionContainer({ children }: { children: ReactNode }) {
  return (
    <div className="h-[calc(50dvh_-_40px)] sm:h-fit sm:max-h-full">
      {children}
    </div>
  );
}
