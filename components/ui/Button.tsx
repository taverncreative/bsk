import Link from 'next/link';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, href, className = '', variant = 'primary', ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-300";
  
  const primaryStyles = "bg-brand-gold text-black shadow-brand-cta hover:scale-[1.02] active:scale-[0.98]";
  const secondaryStyles = "bg-transparent border border-neutral-600 text-white hover:border-brand-gold";

  const variantStyles = variant === 'primary' ? primaryStyles : secondaryStyles;
  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
