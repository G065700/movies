import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`
        w-[calc(100dvw_-_180px)]
        min-h-[100dvh]
        p-5
        ml-[180px]
        ${className ? className : ''}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
