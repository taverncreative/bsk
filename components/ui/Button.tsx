import Link from 'next/link';
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  href,
  className = '',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md px-6 py-3 font-semibold text-sm transition-colors duration-200';

  const variants = {
    primary: 'bg-ink text-paper hover:bg-brand-gold hover:text-ink',
    secondary:
      'bg-transparent border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  } as const;

  const combined = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    const isExternal = /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
    if (isExternal) {
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={combined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} {...props}>
      {children}
    </button>
  );
}
