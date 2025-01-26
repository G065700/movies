import React from 'react';

const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return (
    <input
      className="
        px-[16px]
        text-md
        h-[36px]
        font-medium
        rounded-lg
        box-border
        outline-none
      "
      {...props}
    />
  );
};

export default Input;
