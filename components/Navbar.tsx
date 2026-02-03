import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface NavbarProps {
  onNavigate?: (view: 'home' | 'catalogue' | 'ai-advisor' | 'locations' | 'privacy' | 'terms' | 'warranty') => void;
  currentView?: string;
}

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
      // Adding a small delay to allow the view to change before scrolling
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
         className={`w-full max-w-6xl pointer-events-auto transition-all duration-500 rounded-2xl border overflow-hidden
           ${scrolled || isMobileMenuOpen 
             ? 'bg-neutral-900/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
             : 'bg-neutral-900/40 backdrop-blur-xl border-white/10 shadow-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]'}
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
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6 text-sm font-medium text-neutral-400">
                <button 
                  onClick={() => handleNavClick('catalogue')} 
                  className={`hover:text-white transition-colors relative ${currentView === 'catalogue' ? 'text-white' : ''}`}
                >
                  {t('nav.products')}
                  {currentView === 'catalogue' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>}
                </button>
                <button 
                  onClick={() => handleNavClick('ai-advisor')} 
                  className={`flex items-center gap-1.5 hover:text-white transition-colors relative ${currentView === 'ai-advisor' ? 'text-brand-500' : 'text-brand-500/80'}`}
                >
                  {t('nav.ai_check')}
                  {currentView === 'ai-advisor' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>}
                </button>
                <button 
                  onClick={() => handleNavClick('locations')} 
                  className={`hover:text-white transition-colors relative ${currentView === 'locations' ? 'text-white' : ''}`}
                >
                  {t('nav.locations')}
                  {currentView === 'locations' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>}
                </button>
                <button onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="hover:text-white transition-colors">{t('nav.pricing')}</button>
              </div>
              
              {/* Divider - made more visible */}
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

          {/* Mobile Menu Dropdown */}
          <div ref={menuRef} className="hidden md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
            <div className="flex flex-col p-6 gap-4">
               <button 
                  onClick={() => handleNavClick('catalogue')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium ${currentView === 'catalogue' ? 'text-white bg-white/5' : 'text-neutral-400'}`}
                >
                  {t('nav.products')}
                </button>
                <button 
                  onClick={() => handleNavClick('ai-advisor')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium flex items-center gap-2 ${currentView === 'ai-advisor' ? 'text-brand-500 bg-brand-500/10' : 'text-brand-500/80'}`}
                >
                  {t('nav.ai_check')}
                </button>
                <button 
                  onClick={() => handleNavClick('locations')} 
                  className={`mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium ${currentView === 'locations' ? 'text-white bg-white/5' : 'text-neutral-400'}`}
                >
                  {t('nav.locations')}
                </button>
                <button 
                  onClick={() => {
                    handleNavClick('home');
                    setTimeout(() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }} 
                  className="mobile-nav-item text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors text-lg font-medium text-neutral-400"
                >
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