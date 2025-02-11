import { ReactNode } from 'react';

export default Button;

interface ButtonProps {
  children?: ReactNode;
  onClick: () => void;
  className?: string;
}

function Button({ children = '확인', onClick, className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-[80px] h-[36px] bg-blue-500 rounded-lg text-white font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
