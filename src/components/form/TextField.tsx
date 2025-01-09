'use client';

import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState,
} from 'react';
import Input from './Input';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false);

    // const labelColor = hasError ? 'red' : focused ? 'blue' : undefined;

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true);
      onFocus?.(event);
    };
    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false);
      onBlur?.(event);
    };

    return (
      <div>
        {label ? <span>{label}</span> : null}
        &nbsp;
        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {helpMessage ? <span>{helpMessage}</span> : null}
      </div>
    );
  },
);

export default TextField;
