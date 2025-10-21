import { InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { label, error, className, ...props },
  ref
) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#c4d0ed] mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          'w-full px-4 py-3 rounded-lg bg-[#1a1d2e] text-[#e1e7f5]',
          'neu-pressed border border-transparent',
          'focus:border-[#4f7cff] focus:outline-none',
          'placeholder:text-[#c4d0ed] placeholder:opacity-50',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
