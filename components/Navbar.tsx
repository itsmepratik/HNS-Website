import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Menu, X, Box, Cpu, MapPin, Layers, Users, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavbarProps {
  onNavigate?: (view: 'home' | 'catalogue' | 'ai-advisor' | 'locations' | 'about' | 'blog' | 'privacy' | 'terms' | 'warranty') => void;
  currentView?: string;
}

const NavButton = ({ label, onClick, active, tooltip }: { label: string, onClick: () => void, active: boolean, tooltip: string }) => (
  <button 
    onClick={onClick} 
    className={`group relative flex items-center justify-center gap-1.5 py-2 px-1 transition-colors duration-300 ${active ? 'text-brand-500' : 'text-neutral-400 hover:text-white'}`}
  >
    <span className="relative z-10 font-medium tracking-wide text-sm">{label}</span>
    
    {/* Active Indicator - Liquid Dot */}
    {active && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-500 rounded-full shadow-[0_0_10px_#d5f365] animate-pulse"></span>
    )}
    
    {/* Tooltip with enhanced animation - Z-index fixed */}
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-90 translate-y-[-10px] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap z-[100]">
        <div className="bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 text-[10px] uppercase tracking-widest text-brand-50 px-3 py-2 rounded shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8)] relative border-b-brand-500/50">
            {tooltip}
            {/* Arrow */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f0f0f]/95 border-t border-l border-white/10 rotate-45"></div>
        </div>
    </div>
  </button>
);

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView = 'home' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu opening/closing
  useGSAP(() => {
    if (isMobileMenuOpen) {
      gsap.to(menuRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        display: 'block'
      });
      gsap.fromTo(".mobile-nav-item", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1 }
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = 'none';
        }
      });
    }
  }, [isMobileMenuOpen]);

  const scrollToOffer = () => {
    setIsMobileMenuOpen(false);
    if (onNavigate && currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
         document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
       document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (view: any) => {
    if (onNavigate) onNavigate(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}>
       <nav 
         ref={navRef}
         // Removed overflow-hidden to allow tooltips to show
         // Enhanced liquid glass effect
         className={`w-full max-w-6xl pointer-events-auto transition-all duration-500 rounded-2xl border
           ${scrolled || isMobileMenuOpen 
             ? 'bg-[#121212]/80 backdrop-blur-2xl border-white/10 border-t-white/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] shadow-[0_0_0_1px_rgba(213,243,101,0.05)]' 
             : 'bg-[#121212]/50 backdrop-blur-xl border-white/5 border-t-white/10 shadow-lg'
           }
         `}
       >
        <div className="flex flex-col">
          {/* Top Bar: Logo & Toggles */}
          <div className="flex justify-between items-center py-3 px-6">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => handleNavClick('home')}
            >
              <span className="text-2xl font-bold text-white tracking-tight inline-block group-hover:scale-105 transition-transform">
                HNS<span className="text-brand-500">.</span>
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <div className="flex gap-4 lg:gap-6 text-sm font-medium text-neutral-400">
                <NavButton 
                  label={t('nav.about')} 
                  onClick={() => handleNavClick('about')} 
                  active={currentView === 'about'}
                  tooltip={t('nav.tooltips.about')}
                />
                <NavButton 
                  label={t('nav.products')} 
                  onClick={() => handleNavClick('catalogue')} 
                  active={currentView === 'catalogue'}
                  tooltip={t('nav.tooltips.products')}
                />
                <NavButton 
                  label={t('nav.ai_check')} 
                  onClick={() => handleNavClick('ai-advisor')} 
                  active={currentView === 'ai-advisor'}
                  tooltip={t('nav.tooltips.ai_check')}
                />
                <NavButton 
                  label={t('nav.blog')} 
                  onClick={() => handleNavClick('blog')} 
                  active={currentView === 'blog'}
                  tooltip={t('nav.tooltips.blog')}
                />
                <NavButton 
                  label={t('nav.locations')} 
                  onClick={() => handleNavClick('locations')} 
                  active={currentView === 'locations'}
                  tooltip={t('nav.tooltips.locations')}
                />
                <NavButton 
                  label={t('nav.pricing')} 
                  onClick={() => {
                      handleNavClick('home');
                      setTimeout(() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  active={false}
                  tooltip={t('nav.tooltips.pricing')}
                />
              </div>
              
              {/* Divider */}
              <div className="h-6 w-px bg-white/20"></div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors px-2"
                >
                  <Globe size={18} />
                  <span className="uppercase tracking-wider font-mono text-xs">{language}</span>
                </button>
              </div>

              <Button size="sm" onClick={scrollToOffer} className="shadow-none">
                {t('nav.book')}
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                 <div className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
                    <Menu size={24} />
                 </div>
                 <div className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
                    <X size={24} />
                 </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown - Added overflow-hidden and rounded-b-2xl to clip content properly during animation */}
          <div ref={menuRef} className="hidden md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden rounded-b-2xl">
            <div className="flex flex-col p-6 gap-4">
                <button 
                  onClick={() => handleNavClick('about')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium flex items-center gap-3 ${currentView === 'about' ? 'text-white bg-white/5' : 'text-neutral-400'}`}
                >
                  <Users size={18} className="text-brand-500" />
                  {t('nav.about')}
                </button>
               <button 
                  onClick={() => handleNavClick('catalogue')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium flex items-center gap-3 ${currentView === 'catalogue' ? 'text-white bg-white/5' : 'text-neutral-400'}`}
                >
                  <Box size={18} className="text-brand-500" />
                  {t('nav.products')}
                </button>
                <button 
                  onClick={() => handleNavClick('ai-advisor')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium flex items-center gap-3 ${currentView === 'ai-advisor' ? 'text-brand-500 bg-brand-500/10' : 'text-brand-500/80'}`}
                >
                  <Cpu size={18} />
                  {t('nav.ai_check')}
                </button>
                <button 
                  onClick={() => handleNavClick('blog')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium flex items-center gap-3 ${currentView === 'blog' ? 'text-white bg-white/5' : 'text-neutral-400'}`}
                >
                  <BookOpen size={18} className="text-brand-500" />
                  {t('nav.blog')}
                </button>
                <button 
                  onClick={() => handleNavClick('locations')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium flex items-center gap-3 ${currentView === 'locations' ? 'text-white bg-white/5' : 'text-neutral-400'}`}
                >
                  <MapPin size={18} className="text-brand-500" />
                  {t('nav.locations')}
                </button>
                <button 
                  onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }} 
                  className="mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium flex items-center gap-3 text-neutral-400"
                >
                  <Layers size={18} className="text-brand-500" />
                  {t('nav.pricing')}
                </button>
                
                <div className="h-px bg-white/10 my-2 mobile-nav-item"></div>

                <div className="flex items-center justify-between mobile-nav-item px-4">
                  <span className="text-neutral-400">Language</span>
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Globe size={18} />
                    <span className="uppercase font-mono text-sm">{language}</span>
                  </button>
                </div>

                <div className="pt-2 mobile-nav-item">
                  <Button size="lg" fullWidth onClick={scrollToOffer} className="shadow-none">
                    {t('nav.book')}
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};