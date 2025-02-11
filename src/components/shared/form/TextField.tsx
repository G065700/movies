'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import Input from './Input';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, ...props }, ref) {
    return (
      <div className="flex flex-row items-center gap-[5px]">
        {label && <span className="font-bold min-w-fit">{label}</span>}
        <Input ref={ref} {...props} />
      </div>
    );
  },
);

export default TextField;
