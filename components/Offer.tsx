import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Check, Info, ShieldCheck, Timer, Briefcase, Zap, Settings, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Offer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds
  const { t, formatNumber } = useLanguage();

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
    const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return formatNumber(timeStr);
  };

  return (
    <Section id="offer" className="bg-[#050505] relative overflow-hidden py-24">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Scarcity Banner */}
        <div className="bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-20 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto hover:border-brand-500/30 transition-colors duration-500 group">
           <div className="flex items-center gap-4">
             <div className="p-2.5 bg-brand-500/10 rounded-xl text-brand-500 group-hover:scale-110 transition-transform duration-500">
                <Timer size={24} />
             </div>
             <div>
                <p className="text-white font-bold">{t('offer.scarcity')}</p>
                <p className="text-xs text-neutral-400">Slots filling up fast in Saham branch</p>
             </div>
           </div>
           <div className="px-6 py-2 bg-[#0a0a0a] rounded-xl border border-white/10 font-mono text-2xl font-bold text-brand-500 shadow-[0_0_15px_rgba(213,243,101,0.1)]">
             {formatTime(timeLeft)}
           </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{t('offer.choose')}</h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-light">{t('offer.transparent')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Standard Plan */}
          <div className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
            <div className="bg-[#0c0c0c] rounded-[1.9rem] p-8 h-full flex flex-col relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="mb-8 p-4 bg-neutral-900 rounded-2xl w-fit text-neutral-400 border border-white/5 shadow-inner group-hover:border-white/20 transition-colors">
                   <Settings size={32} className="group-hover:rotate-180 transition-transform duration-700 ease-out" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neutral-200 transition-colors">{t('offer.std_title')}</h3>
                <p className="text-sm text-neutral-500 mb-8 min-h-[40px] leading-relaxed">{t('offer.std_desc')}</p>
                
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-8"></div>
                
                <ul className="space-y-5 mb-10 flex-grow">
                  {[t('offer.std_feat1'), t('offer.std_feat2'), t('offer.std_feat3'), t('offer.std_feat4'), t('offer.std_feat5')].map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      <div className="mt-0.5 p-0.5 rounded-full border border-white/10 text-neutral-600 group-hover:border-white/30 group-hover:text-white transition-colors">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" fullWidth className="border-white/10 hover:bg-white text-white hover:text-black mt-auto group/btn">
                   {t('offer.book_quote')} <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
            </div>
          </div>

          {/* Premium Plan (Highlighted) */}
          <div className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-brand-500 to-brand-600 shadow-[0_0_60px_-15px_rgba(213,243,101,0.3)] lg:-mt-8 lg:mb-4 z-10 flex flex-col h-full transform transition-all duration-500 hover:scale-[1.02]">
             {/* Popular Badge */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-5">
                <div className="bg-brand-500 text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] shadow-[0_4px_20px_rgba(213,243,101,0.4)] flex items-center gap-2">
                   <Zap size={12} fill="black" /> {t('offer.pop_badge')}
                </div>
             </div>

             <div className="bg-[#080808] rounded-[1.9rem] p-8 h-full flex flex-col relative overflow-hidden">
                {/* Ambient Internal Glow */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none"></div>
                
                <div className="mb-8 p-4 bg-brand-500 text-black rounded-2xl w-fit shadow-[0_0_30px_-5px_rgba(213,243,101,0.4)]">
                   <Zap size={32} className="group-hover:scale-110 transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)" fill="black" />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-3">{t('offer.prem_title')}</h3>
                <p className="text-sm text-brand-100/60 mb-8 min-h-[40px] leading-relaxed">{t('offer.prem_desc')}</p>
                
                <div className="h-px w-full bg-gradient-to-r from-brand-500/30 to-transparent mb-8"></div>
                
                <ul className="space-y-5 mb-10 flex-grow">
                  {[t('offer.prem_feat1'), t('offer.prem_feat2'), t('offer.prem_feat3'), t('offer.prem_feat4'), t('offer.prem_feat5'), t('offer.prem_feat6')].map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 text-white">
                      <div className="mt-0.5 p-0.5 rounded-full bg-brand-500 text-black shadow-[0_0_10px_rgba(213,243,101,0.4)]">
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-sm font-bold tracking-wide">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto space-y-4">
                  <Button variant="primary" size="xl" fullWidth onClick={() => alert("Booking System: Premium Quote")} className="shadow-[0_0_30px_rgba(213,243,101,0.3)] hover:shadow-[0_0_50px_rgba(213,243,101,0.5)]">
                    {t('offer.book_quote')}
                  </Button>
                  <p className="text-center text-[10px] text-neutral-500 uppercase tracking-wider flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div>
                    {formatNumber(t('hero.spots'))} {t('hero.spots_rem')}
                  </p>
                </div>
             </div>
          </div>

          {/* Fleet Plan */}
          <div className="group relative p-1 rounded-[2rem] bg-gradient-to-b from-blue-900/50 to-transparent hover:from-blue-600/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
            <div className="bg-[#0c0c0c] rounded-[1.9rem] p-8 h-full flex flex-col relative overflow-hidden">
                {/* Hover Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="mb-8 p-4 bg-blue-950/30 text-blue-400 rounded-2xl w-fit border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                   <Briefcase size={32} className="group-hover:-rotate-12 transition-transform duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{t('offer.fleet_title')}</h3>
                <p className="text-sm text-neutral-500 mb-8 min-h-[40px] leading-relaxed">{t('offer.fleet_desc')}</p>
                
                <div className="h-px w-full bg-gradient-to-r from-blue-500/20 to-transparent mb-8"></div>
                
                <ul className="space-y-5 mb-10 flex-grow">
                  {[t('offer.fleet_feat1'), t('offer.fleet_feat2'), t('offer.fleet_feat3'), t('offer.fleet_feat4'), t('offer.fleet_feat5')].map((feat, i) => (
                    <li key={i} className="flex items-start gap-4 text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      <div className="mt-0.5 p-0.5 rounded-full border border-blue-500/30 text-blue-500 group-hover:bg-blue-500 group-hover:text-black transition-all">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-medium">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="secondary" fullWidth onClick={() => alert("Booking System: Fleet Quote")} className="mt-auto group/btn border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300">
                   {t('offer.book_quote')} <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
            </div>
          </div>

        </div>

        {/* Guarantee Section */}
        <div className="mt-24">
           <div className="relative rounded-3xl bg-neutral-900/30 border border-white/5 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(16,185,129,0.05),transparent_70%)]"></div>
              
              <div className="relative z-10 p-6 bg-[#050505] rounded-full border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)] group">
                 <ShieldCheck size={48} className="text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="relative z-10 max-w-3xl">
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('offer.guarantee_title')}</h3>
                 <p className="text-neutral-400 text-lg leading-relaxed">
                   {t('offer.guarantee_desc')}
                 </p>
              </div>
           </div>
        </div>

      </div>
    </Section>
  );
};