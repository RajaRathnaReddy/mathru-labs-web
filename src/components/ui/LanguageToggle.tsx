'use client';

import { useLanguage } from '@/providers/LanguageProvider';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="relative flex h-9 items-center gap-1 rounded-full border border-border-subtle bg-indigo/50 px-1 text-xs font-medium transition-colors hover:border-amber/30"
      aria-label={`Switch to ${language === 'en' ? 'Telugu' : 'English'}`}
    >
      <span
        className={`relative z-10 rounded-full px-2.5 py-1 transition-colors ${
          language === 'en' ? 'text-ink' : 'text-text-muted'
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 rounded-full px-2.5 py-1 transition-colors ${
          language === 'te' ? 'text-ink' : 'text-text-muted'
        }`}
      >
        తె
      </span>

      {/* Sliding indicator */}
      <motion.div
        className="absolute top-1 h-7 w-10 rounded-full bg-amber"
        animate={{
          left: language === 'en' ? '4px' : 'calc(100% - 44px)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
