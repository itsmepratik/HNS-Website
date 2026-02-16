import React from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';

export const Solution: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section background="darker" className="border-b border-white/5">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-brand-500 font-mono text-sm tracking-wider uppercase mb-3">{t('solution.protocol')}</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t('solution.title_start')} <span className="text-white decoration-brand-500 decoration-4 underline underline-offset-4">{t('solution.title_highlight')}</span> {t('solution.title_end')}
        </h3>
        <p className="text-neutral-400">
          {t('solution.subtitle')}
        </p>
      </div>
    </Section>
  );
};