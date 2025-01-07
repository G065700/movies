import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className="
        max-w-[2520px]
        px-5
        py-6
      "
    >
      {children}
    </div>
  );
};

export default Container;
