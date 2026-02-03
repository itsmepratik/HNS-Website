import React from 'react';
import { Section } from './ui/Section';
import { CheckCircle, Clock, Filter, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Solution: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('solution.step1_title'),
      desc: t('solution.step1_desc')
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: t('solution.step2_title'),
      desc: t('solution.step2_desc')
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: t('solution.step3_title'),
      desc: t('solution.step3_desc')
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: t('solution.step4_title'),
      desc: t('solution.step4_desc')
    }
  ];

  return (
    <Section background="darker" className="border-b border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-brand-500 font-mono text-sm tracking-wider uppercase mb-3">{t('solution.protocol')}</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t('solution.title_start')} <span className="text-white decoration-brand-500 decoration-4 underline underline-offset-4">{t('solution.title_highlight')}</span> {t('solution.title_end')}
        </h3>
        <p className="text-neutral-400">
          {t('solution.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="relative group">
             <div className="absolute inset-0 bg-brand-500/5 translate-y-2 translate-x-2 rtl:-translate-x-2 rounded-xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1 rtl:group-hover:-translate-x-1"></div>
             <div className="glass-panel-light p-6 rounded-xl relative h-full hover:border-brand-500/30 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-brand-500 mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-neutral-800 font-mono text-4xl font-bold opacity-30 select-none">
                  0{idx + 1}
                </div>
             </div>
          </div>
        ))}
      </div>
    </Section>
  );
};