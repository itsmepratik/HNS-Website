import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Check, Info, ShieldCheck, Timer, Briefcase, Zap, Settings, ArrowRight, Star, Flame } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { QuoteModal } from './QuoteModal';

export const Offer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(14400); // 4 hours in seconds
  const [spotsLeft, setSpotsLeft] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'Standard' | 'Premium' | 'Fleet' | null>(null);
  
  const { t, formatNumber } = useLanguage();

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    // Set random spots on mount (between 3 and 12)
    setSpotsLeft(Math.floor(Math.random() * (12 - 3 + 1)) + 3);

    return () => clearInterval(timer);
  }, []);

  const handleOpenModal = (pkg: 'Standard' | 'Premium' | 'Fleet') => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

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

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPackage={selectedPackage} 
      />

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

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          
          {/* Standard Plan */}
          <div className="group relative bg-[#0c0c0c] border border-white/10 rounded-3xl p-8 flex flex-col h-full hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
            <div className="mb-6">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-neutral-400 border border-white/5 mb-4 group-hover:bg-neutral-800 transition-colors">
                   <Settings size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('offer.std_title')}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed h-10">{t('offer.std_desc')}</p>
            </div>
            
            <div className="h-px w-full bg-white/5 mb-6"></div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {[t('offer.std_feat1'), t('offer.std_feat2'), t('offer.std_feat3'), t('offer.std_feat5')].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300 group-hover:text-white transition-colors">
                  <Check size={16} className="text-neutral-500 mt-0.5" />
                  <span className="text-sm font-medium">{feat}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  fullWidth 
                  className="border-white/10 hover:bg-white text-white hover:text-black"
                  onClick={() => handleOpenModal('Standard')}
                >
                   {t('offer.book_quote')}
                </Button>
            </div>
          </div>

          {/* Premium Plan (Highlighted) */}
          <div className="relative bg-[#0a0a0a] border border-brand-500/50 rounded-3xl p-1 shadow-[0_0_50px_-20px_rgba(213,243,101,0.2)] lg:-mt-4 lg:mb-4 z-10">
             {/* Best Value Badge - Floating Pill */}
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-brand-500 text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-[0_4px_20px_rgba(213,243,101,0.4)] flex items-center gap-1.5 whitespace-nowrap border-2 border-[#0a0a0a]">
                   <Flame size={12} fill="black" /> {t('offer.pop_badge')}
                </div>
             </div>

             <div className="bg-[#0c0c0c] rounded-[1.4rem] p-8 h-full flex flex-col relative overflow-hidden">
                {/* Subtle Gradient Overlay */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none"></div>
                
                <div className="mb-6 relative z-10">
                   <div className="w-14 h-14 bg-brand-500 text-black rounded-xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(213,243,101,0.3)]">
                      <Zap size={28} fill="black" />
                   </div>
                   
                   <h3 className="text-3xl font-black text-white mb-2">{t('offer.prem_title')}</h3>
                   <p className="text-sm text-brand-100/80 leading-relaxed h-10">{t('offer.prem_desc')}</p>
                </div>
                
                <div className="h-px w-full bg-brand-500/20 mb-6"></div>
                
                <ul className="space-y-4 mb-8 flex-grow relative z-10">
                  {[t('offer.prem_feat1'), t('offer.prem_feat2'), t('offer.prem_feat3'), t('offer.prem_feat4'), t('offer.prem_feat5'), t('offer.prem_feat6')].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-white">
                      <div className="mt-0.5 p-0.5 rounded-full bg-brand-500 text-black shadow-[0_0_8px_rgba(213,243,101,0.3)]">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="text-sm font-bold tracking-wide">{feat}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto space-y-4 relative z-10">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth 
                    onClick={() => handleOpenModal('Premium')} 
                    className="shadow-[0_0_30px_rgba(213,243,101,0.3)] hover:shadow-[0_0_50px_rgba(213,243,101,0.5)]"
                  >
                    {t('offer.book_quote')}
                  </Button>
                  
                  {/* Refined Spots Remaining Badge - Style Matched to Hero */}
                  <div className="flex items-center justify-center gap-3 px-4 py-2 bg-[#0f0f0f]/80 border border-white/5 rounded-full backdrop-blur-md shadow-xl w-fit mx-auto">
                     <div className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                     </div>
                     <p className="text-xs text-neutral-400 font-medium">
                        <span className="text-white font-bold font-mono text-sm tracking-tight">{formatNumber(spotsLeft + ' spots')}</span> remaining
                     </p>
                  </div>
                </div>
             </div>
          </div>

          {/* Fleet Plan */}
          <div className="group relative bg-[#0c0c0c] border border-white/10 rounded-3xl p-8 flex flex-col h-full hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
             {/* Glow Effect on Hover */}
             <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>

            <div className="mb-6 relative z-10">
                <div className="w-12 h-12 bg-blue-900/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                   <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('offer.fleet_title')}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed h-10">{t('offer.fleet_desc')}</p>
            </div>
            
            <div className="h-px w-full bg-white/5 mb-6"></div>
            
            <ul className="space-y-4 mb-8 flex-grow relative z-10">
              {[t('offer.fleet_feat1'), t('offer.fleet_feat2'), t('offer.fleet_feat3'), t('offer.fleet_feat4'), t('offer.fleet_feat5')].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300 group-hover:text-white transition-colors">
                  <Check size={16} className="text-blue-500 mt-0.5" />
                  <span className="text-sm font-medium">{feat}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto relative z-10">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  fullWidth 
                  onClick={() => handleOpenModal('Fleet')} 
                  className="border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-300"
                >
                   {t('offer.book_quote')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
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