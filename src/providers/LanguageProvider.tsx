'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import en from '@/locales/en.json';
import te from '@/locales/te.json';

type Language = 'en' | 'te';

type TranslationData = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationData;
}

const translations: Record<Language, TranslationData> = { en, te };

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Sync class and language attribute on mount from localStorage if present
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('mathru_lang') as Language | null;
      if (saved === 'te' || saved === 'en') {
        setLanguageState(saved);
        document.documentElement.lang = saved;
        if (saved === 'te') {
          document.documentElement.classList.add('text-telugu');
          document.body.classList.add('text-telugu');
        } else {
          document.documentElement.classList.remove('text-telugu');
          document.body.classList.remove('text-telugu');
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    if (lang === 'te') {
      document.documentElement.classList.add('text-telugu');
      document.body.classList.add('text-telugu');
    } else {
      document.documentElement.classList.remove('text-telugu');
      document.body.classList.remove('text-telugu');
    }
    try {
      localStorage.setItem('mathru_lang', lang);
    } catch {
      // Ignore
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'te' : 'en');
  }, [language, setLanguage]);

  const t = useMemo(() => translations[language], [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, t }),
    [language, setLanguage, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
