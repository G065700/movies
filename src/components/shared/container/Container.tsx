import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`
        min-h-[calc(100dvh_-_80px)]
        w-full
        px-5
        py-6
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
