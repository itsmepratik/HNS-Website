import React, { useRef } from 'react';
import { Button } from './ui/Button';
import { ArrowRight, ArrowLeft, Phone, Wallet, Gauge, ShieldCheck, Star, Trophy, MapPin, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookingForm } from './BookingForm';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const Hero: React.FC = () => {
  const { t, dir, formatNumber } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = () => {
    const nameInput = document.getElementById('booking-name');
    if (nameInput) {
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Small delay to allow scroll to finish on mobile before focusing, preventing keyboard jumpiness
      setTimeout(() => {
        nameInput.focus();
      }, 500);
    }
  };

  const handleCallClick = () => {
    window.location.href = "tel:+96899999999"; // Replace with actual number
  };

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Ensure elements are visible at start of animation sequence by using autoAlpha
    gsap.set(".hero-badge, .hero-title-line, .hero-subtitle, .hero-trust-badge, .hero-actions, .hero-stat-card, .hero-form-container", { autoAlpha: 1 });

    // Reduced initial delay for snappier load
    tl.delay(0.1);

    // Stagger text elements
    tl.from(".hero-badge", { y: -20, autoAlpha: 0, duration: 0.8 });
    tl.from(".hero-title-line", { y: 50, autoAlpha: 0, duration: 1, stagger: 0.15 }, "-=0.6");
    tl.from(".hero-subtitle", { y: 20, autoAlpha: 0, duration: 1 }, "-=0.8");
    
    // Badges Entrance
    tl.from(".hero-trust-badge", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.1 }, "-=0.6");
    
    tl.from(".hero-actions", { y: 20, autoAlpha: 0, duration: 0.8 }, "-=0.6");
    
    // Animate new stats cards with Scale and Pop effect
    tl.from(".hero-stat-card", { 
      y: 30, 
      autoAlpha: 0, 
      scale: 0.8, 
      duration: 0.8, 
      ease: "back.out(1.7)", // Polished pop effect
      stagger: 0.15 
    }, "-=0.6");

    // Form animation
    tl.from(".hero-form-container", { 
      y: 20, 
      autoAlpha: 0, 
      duration: 0.8, 
      ease: "power2.out" 
    }, "-=1.0");

    // Slow zoom for background image
    gsap.to(".hero-bg-img", {
      scale: 1.1,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true
    });

  }, { scope: heroRef });

  return (
    <div ref={heroRef} className="relative pt-24 pb-8 md:pt-32 px-4 md:px-6 bg-[#050505] overflow-hidden">
      <div className="container mx-auto max-w-[1440px]">
        {/* Responsive Min-Height: Auto on mobile, 85vh on desktop */}
        <div className="relative rounded-3xl overflow-hidden min-h-[auto] lg:min-h-[85vh] flex items-center shadow-[0_0_80px_-20px_rgba(213,243,101,0.1)] border border-white/10 bg-[#080808] group">
          
          {/* Animated Background Image - Mechanic in Red */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000&auto=format&fit=crop" 
              alt="Professional mechanic working on car" 
              className="hero-bg-img w-full h-full object-cover object-center scale-100"
            />
            {/* Advanced Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 md:via-[#050505]/80 to-transparent/60 md:to-transparent/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
            {/* Subtle animated spot glow behind text */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-[5s]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 py-12 md:py-20">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Column: Text */}
              <div className="lg:col-span-7 text-center lg:text-start flex flex-col items-center lg:items-start">
                
                {/* Premium Status Badge */}
                <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-md text-brand-400 text-xs font-semibold mb-8 shadow-[0_0_20px_rgba(213,243,101,0.15)]">
                  <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
                  {t('hero.status')}
                </div>
                
                {/* Responsive Typography: INCREASED MOBILE FONT SIZE */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8 leading-[0.95]">
                  <span className="hero-title-line block drop-shadow-lg">{t('hero.title_1')}</span>
                  <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-500 to-brand-600 drop-shadow-[0_0_30px_rgba(213,243,101,0.3)]">{t('hero.title_2')}</span>
                </h1>
                
                {/* Subtitle with tighter leading on mobile */}
                <p className="hero-subtitle text-base md:text-lg lg:text-xl text-neutral-300 mb-8 max-w-xl md:max-w-2xl mx-auto lg:mx-0 leading-tight md:leading-relaxed font-light">
                  {t('hero.subtitle')}
                </p>

                {/* TRUST BADGES ROW (Restored above buttons) */}
                <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-6 sm:gap-8 mb-10 w-full pl-1">
                  {/* Google Reviews */}
                  <div className="hero-trust-badge flex items-center gap-3 transition-opacity hover:opacity-80 cursor-default">
                    <div className="bg-white rounded-full p-1 shadow-lg shrink-0">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none min-w-0">
                      <span className="text-white text-sm font-bold mb-0.5 tracking-wide">{t('hero.google_rating')}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-yellow-400 shrink-0">
                          {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                        </div>
                        <span className="text-[10px] text-neutral-400 font-medium">{t('hero.google_sub')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Award Badge */}
                  <div className="hero-trust-badge flex items-center gap-3 transition-opacity hover:opacity-80 cursor-default">
                    <div className="bg-gradient-to-br from-brand-400 to-brand-600 text-black rounded-full p-1.5 shadow-[0_0_15px_rgba(213,243,101,0.4)] shrink-0">
                      <Trophy size={14} fill="currentColor" />
                    </div>
                    <div className="flex flex-col items-start leading-none min-w-0">
                      <span className="text-white text-sm font-bold mb-0.5 tracking-wide">{t('hero.award_title')}</span>
                      <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">{t('hero.award_sub')}</span>
                    </div>
                  </div>
                </div>

                <div className="hero-actions flex flex-col gap-6 justify-center lg:justify-start items-center lg:items-start mb-12 md:mb-16 w-full md:w-auto">
                  {/* Increased gap between buttons from gap-4 to gap-6 for nicer spacing */}
                  <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                    <Button size="xl" onClick={handleCtaClick} className="w-full sm:w-auto min-w-[200px] shadow-[0_0_40px_rgba(213,243,101,0.3)] hover:shadow-[0_0_60px_rgba(213,243,101,0.5)] border border-brand-400/50">
                        {t('hero.cta')}
                        <ArrowIcon className={`w-5 h-5 transition-transform ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                    
                    <Button variant="outline" size="xl" onClick={handleCallClick} className="w-full sm:w-auto min-w-[160px] border-white/20 hover:bg-white/10 text-white transition-colors backdrop-blur-sm">
                        <Phone className={`w-5 h-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                        {t('hero.call')}
                    </Button>
                  </div>
                  
                  {/* Modern Spots Remaining Indicator */}
                  <div className="flex items-center gap-3 px-4 py-2 bg-[#0f0f0f]/80 border border-white/5 rounded-full backdrop-blur-md shadow-xl">
                     <div className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                     </div>
                     <p className="text-xs text-neutral-400 font-medium">
                        <span className="text-white font-bold font-mono text-sm tracking-tight">{formatNumber(t('hero.spots'))}</span> {t('hero.spots_rem')}
                     </p>
                  </div>
                </div>

                {/* Updated Stats Cards with Liquid Glass Effect - Stack on mobile, grid on larger */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-lg lg:max-w-none">
                  {/* Stat 1: Improved Mileage */}
                  <div className="hero-stat-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 text-left hover:bg-white/10 transition-colors group hover:scale-[1.02] duration-300">
                    <div className="mb-0 sm:mb-3 p-2.5 bg-brand-500/10 rounded-xl text-brand-500 group-hover:bg-brand-500/20 transition-colors shadow-[0_0_20px_rgba(213,243,101,0.1)]">
                      <TrendingUp size={24} />
                    </div>
                    <div>
                      <p className="text-white text-xl md:text-2xl font-bold font-mono tracking-tight">{formatNumber('30%')}</p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider leading-tight mt-1">{t('hero.stat_1')}</p>
                    </div>
                  </div>

                  <div className="hero-stat-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 text-left hover:bg-white/10 transition-colors group hover:scale-[1.02] duration-300">
                    <div className="mb-0 sm:mb-3 p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500/20 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                      <Gauge size={24} />
                    </div>
                    <div>
                      <p className="text-white text-xl md:text-2xl font-bold font-mono tracking-tight">{formatNumber('15%')}</p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider leading-tight mt-1">{t('hero.stat_2')}</p>
                    </div>
                  </div>

                  <div className="hero-stat-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 text-left hover:bg-white/10 transition-colors group hover:scale-[1.02] duration-300">
                    <div className="mb-0 sm:mb-3 p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500/20 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-white text-xl md:text-2xl font-bold font-mono tracking-tight">{formatNumber('100%')}</p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-wider leading-tight mt-1">{t('hero.stat_3')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Form */}
              <div className="hero-form-container lg:col-span-5 w-full relative z-20 mt-8 lg:mt-0">
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