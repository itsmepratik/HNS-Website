import React from 'react';
import { Section } from './ui/Section';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Warning: React.FC = () => {
  const { t, formatNumber } = useLanguage();

  return (
    <Section background="darker" className="border-t border-red-900/20 relative overflow-hidden">
      {/* Red ambient glow */}
      <div className="absolute inset-0 bg-red-900/5 pointer-events-none"></div>

      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="inline-flex items-center gap-2 text-red-500 font-bold mb-4 bg-red-950/30 px-3 py-1 rounded border border-red-900/30">
            <AlertCircle size={16} /> {t('warning.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('warning.title')}
          </h2>
          <p className="text-neutral-400 mb-6">
            {t('warning.desc')}
          </p>
          <div className="p-6 bg-red-950/20 border border-red-900/30 rounded-xl">
             <h4 className="text-white font-bold mb-4">{t('warning.bill_title')}</h4>
             <div className="flex items-center justify-between mb-2">
               <span className="text-neutral-400">{t('warning.engine_block')}</span>
               <span className="text-white font-mono">{formatNumber('1,200')} OMR</span>
             </div>
             <div className="flex items-center justify-between mb-2">
               <span className="text-neutral-400">{t('warning.labor')}</span>
               <span className="text-white font-mono">{formatNumber('900')} OMR</span>
             </div>
             <div className="h-px bg-red-900/30 my-3"></div>
             <div className="flex items-center justify-between">
               <span className="text-red-400 font-bold">{t('warning.total')}</span>
               <span className="text-red-500 font-mono font-bold text-xl">{formatNumber('2,100')} OMR</span>
             </div>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
           <div className="relative w-full max-w-sm aspect-square bg-neutral-900 rounded-full flex items-center justify-center border-4 border-neutral-800 shadow-[0_0_100px_rgba(220,38,38,0.2)]">
              <div className="text-center">
                 <p className="text-neutral-500 font-mono uppercase text-[0.9375rem] mb-2">Average</p>
                 <p className="text-5xl md:text-6xl font-bold text-white">{formatNumber('7.5')} <span className="text-xl md:text-2xl text-neutral-500">Rials</span></p>
                 <p className="text-emerald-500 mt-4 font-bold">{t('warning.safe')}</p>
              </div>
              
              {/* Spinning danger ring */}
              <div className="absolute inset-0 border-t-4 border-red-600 rounded-full animate-spin duration-[10s]"></div>
           </div>
        </div>
      </div>
    </Section>
  );
};