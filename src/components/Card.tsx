import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const Card = ({ children, title, className }: CardProps) => {
  return (
    <div className={clsx(
      'bg-[#2d3250] rounded-2xl p-6 neu-raised animate-fade-in',
      className
    )}>
      {title && (
        <h2 className="text-2xl font-semibold text-[#e1e7f5] mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
};
