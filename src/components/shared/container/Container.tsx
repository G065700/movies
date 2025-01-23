import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`
        // h-[100dvh]
        w-[calc(100dvw_-_180px)]
        px-5
        py-6
        ml-[180px]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
