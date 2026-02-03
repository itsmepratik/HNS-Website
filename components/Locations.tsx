import React from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from './ui/Button';

export const Locations: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#050505] relative">
      <Section className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('locations.title')}</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">{t('locations.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
          {/* Map Container */}
          <div className="h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
             <div className="absolute inset-0 bg-brand-500/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
             <iframe 
               width="100%" 
               height="100%" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0} 
               src="https://maps.google.com/maps?q=Saham,Oman&t=&z=13&ie=UTF8&iwloc=&output=embed&style=feature:all|element:all|saturation:-100|invert_lightness:true"
               className="grayscale hover:grayscale-0 transition-all duration-700"
               style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
             ></iframe>
             
             {/* Map Overlay Badge */}
             <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                   <MapPin className="text-brand-500" size={18} />
                   <span className="text-white font-bold">Saham HQ</span>
                </div>
                <p className="text-xs text-neutral-400">Advanced Diagnostic Center & Quick Lube Bay</p>
             </div>
          </div>

          {/* Info Panel */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between">
            <div className="space-y-10">
               <div>
                  <h3 className="text-brand-500 font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                     <MapPin size={16} /> {t('locations.address_title')}
                  </h3>
                  <p className="text-2xl text-white font-bold leading-relaxed">{t('locations.address_val')}</p>
               </div>

               <div>
                  <h3 className="text-brand-500 font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Clock size={16} /> {t('locations.hours_title')}
                  </h3>
                  <p className="text-white whitespace-pre-line text-lg">{t('locations.hours_val')}</p>
               </div>

               <div>
                  <h3 className="text-brand-500 font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Phone size={16} /> {t('locations.contact_title')}
                  </h3>
                  <p className="text-3xl text-white font-bold tracking-tight mb-2">+968 9999 9999</p>
                  <p className="text-neutral-500 text-sm">support@turbolube.om</p>
               </div>
            </div>

            <div className="mt-8">
               <Button size="xl" fullWidth className="group" onClick={() => window.open('https://maps.google.com/maps?q=Saham,Oman', '_blank')}>
                  <Navigation className="mr-2 group-hover:rotate-45 transition-transform" />
                  {t('locations.get_directions')}
               </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};