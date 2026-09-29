'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Whether to show the decorative divider line at the top */
  showDivider?: boolean;
  /** Padding variants */
  padding?: 'default' | 'compact' | 'none';
}

export function SectionWrapper({
  id,
  children,
  className = '',
  showDivider = true,
  padding = 'default',
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { canHandleAnimations } = useDeviceCapability();

  const paddingClass = {
    default: 'py-20 sm:py-24 lg:py-32',
    compact: 'py-12 sm:py-16 lg:py-20',
    none: '',
  }[padding];

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${paddingClass} ${className}`}
    >
      {showDivider && (
        <div className="absolute top-0 left-0 right-0">
          <div className="section-divider" />
        </div>
      )}

      {canHandleAnimations ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      ) : (
        <div>{children}</div>
      )}
    </section>
  );
}
