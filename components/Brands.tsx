import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const Brands: React.FC = () => {
  const { t } = useLanguage();
  
  const brands = [
    "BMW", "MERCEDES", "AUDI", "TOYOTA", "HONDA", "FORD", "CHEVROLET", "NISSAN", "LEXUS", "VOLKSWAGEN", "JEEP", "SUBARU"
  ];

  return (
    <div className="w-full bg-[#080808] border-y border-white/5 py-8 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-6 text-center">
        <p className="text-[0.9375rem] font-mono text-neutral-500 uppercase tracking-widest">{t('brands.title')}</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-12 sm:gap-24 items-center">
          {brands.map((brand, i) => (
            <span key={i} className="text-2xl sm:text-3xl font-black text-neutral-800 uppercase tracking-tighter hover:text-brand-500/50 transition-colors cursor-default select-none font-sans">
              {brand}
            </span>
          ))}
          {/* Duplicate for infinite loop */}
          {brands.map((brand, i) => (
            <span key={`dup-${i}`} className="text-2xl sm:text-3xl font-black text-neutral-800 uppercase tracking-tighter hover:text-brand-500/50 transition-colors cursor-default select-none font-sans">
              {brand}
            </span>
          ))}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#080808] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#080808] to-transparent pointer-events-none"></div>
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* RTL support for marquee */
        html[dir="rtl"] .animate-marquee {
          animation: marquee-rtl 30s linear infinite;
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  );
};