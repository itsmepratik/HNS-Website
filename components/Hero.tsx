import React, { useRef } from 'react';
import { Button } from './ui/Button';
import { ArrowRight, ArrowLeft, Phone, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookingForm } from './BookingForm';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Hero: React.FC = () => {
  const { t, dir } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = () => {
    const nameInput = document.getElementById('booking-name');
    if (nameInput) {
      nameInput.focus();
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCallClick = () => {
    window.location.href = "tel:+96899999999"; // Replace with actual number
  };

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial delay for navbar to load
    tl.delay(0.2);

    // Stagger text elements
    tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.8 });
    tl.from(".hero-title-line", { y: 50, opacity: 0, duration: 1, stagger: 0.15 }, "-=0.6");
    tl.from(".hero-subtitle", { y: 20, opacity: 0, duration: 1 }, "-=0.8");
    tl.from(".hero-actions", { y: 20, opacity: 0, duration: 0.8 }, "-=0.8");
    tl.from(".hero-hud", { opacity: 0, duration: 1 }, "-=0.6");

    // Form animation coming from side
    tl.from(".hero-form-container", { 
      x: 50, 
      opacity: 0, 
      duration: 1.2, 
      ease: "power2.out" 
    }, "-=1.2");

  }, { scope: heroRef });

  return (
    <div ref={heroRef} className="relative pt-32 pb-8 px-4 md:px-6 bg-[#050505]">
      <div className="container mx-auto max-w-[1440px]">
        <div className="relative rounded-3xl overflow-hidden min-h-[85vh] flex items-center shadow-2xl border border-white/10">
          
          {/* Background Image - Mechanic in Red */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000&auto=format&fit=crop" 
              alt="Professional mechanic working on car" 
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-8 md:px-16 py-12 md:py-20">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Column: Text */}
              <div className="lg:col-span-7 text-center lg:text-start">
                <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-black/40 backdrop-blur-md text-brand-400 text-xs font-mono mb-8 animate-pulse shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                  {t('hero.status')}
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[0.95]">
                  <span className="hero-title-line block">{t('hero.title_1')}</span>
                  <span className="hero-title-line block text-brand-500">{t('hero.title_2')}</span>
                </h1>
                
                <p className="hero-subtitle text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  {t('hero.subtitle')}
                </p>

                <div className="hero-actions flex flex-col gap-6 justify-center lg:justify-start items-center lg:items-start mb-16">
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button size="xl" onClick={handleCtaClick} className="w-full sm:w-auto min-w-[200px] shadow-[0_0_40px_rgba(213,243,101,0.3)]">
                        {t('hero.cta')}
                        <ArrowIcon className={`w-5 h-5 transition-transform ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                    
                    <Button variant="outline" size="xl" onClick={handleCallClick} className="w-full sm:w-auto min-w-[160px] border-white/20 hover:bg-white/10 text-white transition-colors">
                        <Phone className={`w-5 h-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                        {t('hero.call')}
                    </Button>
                  </div>
                  
                  {/* Spots Remaining Indicator */}
                  <div className="inline-flex items-center gap-2 bg-red-950/30 border border-red-900/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                     <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                     </span>
                     <p className="text-xs text-red-300 font-mono tracking-wide">
                        <span className="font-bold text-white">{t('hero.spots')}</span> {t('hero.spots_rem')}
                     </p>
                  </div>
                </div>

                {/* HUD Elements - Simplified and Modernized */}
                <div className="hero-hud grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                  <div className="text-start">
                    <p className="text-brand-500 text-2xl font-bold font-mono">1.6k+</p>
                    <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1">{t('hero.stat_1')}</p>
                  </div>
                  <div className="text-start border-l border-white/10 pl-6">
                    <p className="text-white text-2xl font-bold font-mono">15%</p>
                    <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1">{t('hero.stat_2')}</p>
                  </div>
                  <div className="text-start border-l border-white/10 pl-6">
                    <p className="text-white text-2xl font-bold font-mono">100%</p>
                    <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1">{t('hero.stat_3')}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Form */}
              <div className="hero-form-container lg:col-span-5 w-full">
                 <div className="transform transition-all hover:scale-[1.01] duration-500">
                    <BookingForm />
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};