import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type LogoVariant = 'wordmark' | 'avatar' | 'monochrome';

export interface LogoProps {
  variant?: LogoVariant;
  size?: number | string;
  className?: string;
  alt?: string;
  priority?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  variant = 'wordmark',
  size,
  className,
  alt = 'Rashwan Media Logo',
  priority = false,
}) => {
  const logoSrc = {
    wordmark: '/assets/logo.svg',
    monochrome: '/assets/logo-monochrome.svg',
    avatar: '/assets/logo-avatar.svg',
  }[variant];

  const defaultSize = variant === 'avatar' ? 120 : 200;
  const logoSize = size || defaultSize;
  const numericSize = typeof logoSize === 'string' ? parseInt(logoSize, 10) : logoSize;

  return (
    <div className={cn('inline-flex items-center', className)}>
      <Image
        src={logoSrc}
        alt={alt}
        width={numericSize}
        height={variant === 'avatar' ? numericSize : numericSize * 0.3}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
        className="w-auto h-auto"
      />
    </div>
  );
};

export default Logo;