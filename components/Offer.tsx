import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Check, Info, ShieldCheck, Timer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Offer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Section id="offer" className="bg-gradient-to-b from-[#050505] to-neutral-900 border-y border-white/5 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Scarcity Banner */}
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-lg p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse">
           <div className="flex items-center gap-3">
             <Timer className="text-brand-500" />
             <p className="text-brand-100 font-medium">{t('offer.scarcity')}</p>
           </div>
           <div className="font-mono text-2xl font-bold text-brand-400">
             {formatTime(timeLeft)}
           </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">{t('offer.choose')}</h2>
          <p className="text-neutral-400">{t('offer.transparent')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Standard Plan */}
          <div className="p-8 rounded-2xl border border-white/5 bg-white/5 blur-0 hover:bg-white/10 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2">{t('offer.std_title')}</h3>
            <div className="flex items-baseline gap-1 mb-6 ltr:flex-row rtl:flex-row-reverse">
              <span className="text-3xl font-bold text-white">18</span>
              <span className="text-sm text-neutral-500">.000 OMR</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-neutral-300"><Check size={18} /> {t('offer.std_feat1')}</li>
              <li className="flex items-center gap-3 text-neutral-300"><Check size={18} /> {t('offer.std_feat2')}</li>
              <li className="flex items-center gap-3 text-neutral-300"><Check size={18} /> {t('offer.std_feat3')}</li>
            </ul>
            <Button variant="secondary" fullWidth onClick={() => alert("Booking System: Standard Plan Selected")}>{t('offer.book_std')}</Button>
          </div>

          {/* Premium Plan (The Offer) */}
          <div className="relative p-8 rounded-2xl border-2 border-brand-500 bg-neutral-900/80 shadow-[0_0_50px_rgba(213,243,101,0.15)] transform md:scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-neutral-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              {t('offer.pop_badge')}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('offer.prem_title')}</h3>
            <p className="text-sm text-brand-500 mb-4 font-mono">{t('offer.first_time')}</p>
            <div className="flex items-baseline gap-2 mb-2 ltr:flex-row rtl:flex-row-reverse">
              <span className="text-5xl font-bold text-white">7</span>
              <span className="text-xl text-neutral-400">.500</span>
              <span className="text-lg text-neutral-600 line-through decoration-red-500 decoration-2 ml-2">35.000 OMR</span>
            </div>
            <p className="text-xs text-neutral-400 mb-6">{t('offer.limit')}</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-white font-medium"><Check size={18} className="text-brand-500 shrink-0" /> {t('offer.prem_feat1')}</li>
              <li className="flex items-center gap-3 text-white font-medium"><Check size={18} className="text-brand-500 shrink-0" /> {t('offer.prem_feat2')}</li>
              <li className="flex items-center gap-3 text-white font-medium"><Check size={18} className="text-brand-500 shrink-0" /> {t('offer.prem_feat3')}</li>
              <li className="flex items-center gap-3 text-white font-medium"><Check size={18} className="text-brand-500 shrink-0" /> {t('offer.prem_feat4')}</li>
            </ul>
            <Button variant="primary" size="lg" fullWidth onClick={() => alert("Booking System: Premium Special Selected")}>
              {t('offer.claim')}
            </Button>
            <p className="text-center text-xs text-neutral-500 mt-4 flex items-center justify-center gap-1">
              <Info size={12} /> {t('hero.spots')} {t('hero.spots_rem')}
            </p>
          </div>

        </div>

        {/* Guarantee */}
        <div className="mt-16 bg-neutral-800/50 rounded-xl p-8 border border-white/5 flex flex-col md:flex-row items-center gap-6 text-center md:text-start">
           <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-500 shrink-0">
             <ShieldCheck size={48} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-white mb-2">{t('offer.guarantee_title')}</h3>
             <p className="text-neutral-400">
               {t('offer.guarantee_desc')}
             </p>
           </div>
        </div>

      </div>
    </Section>
  );
};