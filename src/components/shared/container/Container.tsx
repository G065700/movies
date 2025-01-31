import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`
        min-h-full
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
