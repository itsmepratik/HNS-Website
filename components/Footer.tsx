import React from 'react';
import { Button } from './ui/Button';
import { MapPin, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate?: (view: 'home' | 'catalogue' | 'ai-advisor' | 'locations' | 'about' | 'blog' | 'privacy' | 'terms' | 'warranty') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const scrollToOffer = () => {
    if (onNavigate) {
      onNavigate('home');
      setTimeout(() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (view: any) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Reminder CTA */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">{t('footer.title')}</h2>
          <p className="text-neutral-400 mb-8">
            {t('footer.subtitle')}
          </p>
          <Button size="xl" onClick={scrollToOffer}>
            {t('footer.cta')}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 border-t border-white/5 pt-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
               <span className="text-xl font-bold text-white">HNS<span className="text-brand-500">.</span></span>
            </div>
            <p className="text-neutral-500 text-sm mb-4">
              {t('footer.desc')}
            </p>
             <div className="flex gap-4">
                <button onClick={() => handleLinkClick('about')} className="text-brand-500 text-sm font-bold hover:underline">
                  {t('nav.about')}
                </button>
                <button onClick={() => handleLinkClick('blog')} className="text-brand-500 text-sm font-bold hover:underline">
                  {t('nav.blog')}
                </button>
             </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <MapPin size={16} className="text-brand-500" />
                Saham Main Road, Near Central Market
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Phone size={16} className="text-brand-500" />
                +968 9999 9999
              </li>
              <li className="flex items-center gap-3 text-neutral-400 text-sm">
                <Calendar size={16} className="text-brand-500" />
                Sat-Thu: 8am - 9pm
              </li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-4">{t('footer.legal')}</h4>
             <ul className="space-y-2 text-sm text-neutral-500">
               <li onClick={() => handleLinkClick('privacy')} className="hover:text-white cursor-pointer transition-colors">{t('footer.privacy')}</li>
               <li onClick={() => handleLinkClick('terms')} className="hover:text-white cursor-pointer transition-colors">{t('footer.terms')}</li>
               <li onClick={() => handleLinkClick('warranty')} className="hover:text-white cursor-pointer transition-colors">{t('footer.warranty')}</li>
             </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-neutral-600 text-xs">
          © {new Date().getFullYear()} {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};