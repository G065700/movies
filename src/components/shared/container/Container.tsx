import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`
        min-h-[calc(100dvh_-_40px)]
        p-5
        sm:ml-[180px]
        ${className ? className : ''}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
