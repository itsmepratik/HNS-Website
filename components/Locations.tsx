import React, { useState, useRef, useEffect } from 'react';
import { Section } from './ui/Section';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Clock, Phone, Navigation, ChevronRight, ChevronLeft, LocateFixed, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  addressKey: string;
  phone: string;
}

// Updated Coordinates for Saham Sanaiya, Abu Al Durus, and Hafeeth
const LOCATIONS: Location[] = [
  { 
    id: 1, 
    name: 'Saham Sanaiya', 
    lat: 24.1750, 
    lng: 56.8850, 
    addressKey: 'Saham Industrial Area, Main St, Saham',
    phone: '+968 7117 0805'
  },
  { 
    id: 2, 
    name: 'Abu Al Durus', 
    lat: 24.1934275, 
    lng: 56.8596748, 
    addressKey: 'Abu Al Durus Main Road',
    phone: '+968 7117 0805'
  },
  { 
    id: 3, 
    name: 'Hafeeth', 
    lat: 24.0422497, 
    lng: 57.0050221, 
    addressKey: 'Al Hafeeth Center, Main Highway',
    phone: '+968 7117 0805'
  }
];

export const Locations: React.FC = () => {
  const { t, dir } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFinding, setIsFinding] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeLocation = LOCATIONS[activeIndex];

  const changeLocation = (newIndex: number) => {
    if (newIndex === activeIndex || isAnimating) return;
    
    setIsAnimating(true);
    setDirection(newIndex > activeIndex ? 1 : -1);
    
    // Animate out
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(newIndex);
        // Animation in is handled by the useEffect dependent on activeIndex
      }
    });

    tl.to(".location-info-content", {
      opacity: 0,
      x: newIndex > activeIndex ? -20 : 20,
      duration: 0.3,
      ease: "power2.in"
    });
    
    tl.to(".map-overlay", {
      opacity: 1, // Flash white/overlay to hide iframe reload
      duration: 0.3
    }, 0);
  };

  useGSAP(() => {
    // Animate in when activeIndex changes
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    tl.to(".map-overlay", {
      opacity: 0,
      duration: 0.5,
      delay: 0.2 // Give iframe a moment to load
    });

    tl.fromTo(".location-info-content", 
      { opacity: 0, x: direction * 20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3"
    );

  }, { scope: containerRef, dependencies: [activeIndex] });

  const nextLocation = () => {
    const next = (activeIndex + 1) % LOCATIONS.length;
    changeLocation(next);
  };

  const prevLocation = () => {
    const prev = (activeIndex - 1 + LOCATIONS.length) % LOCATIONS.length;
    changeLocation(prev);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      if (dir === 'rtl') prevLocation(); else nextLocation();
    }
    if (isRightSwipe) {
      if (dir === 'rtl') nextLocation(); else prevLocation();
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Find nearest logic
  const findNearest = () => {
    if (!navigator.geolocation) {
      alert(t('locations.location_blocked'));
      return;
    }
    
    setIsFinding(true);

    // Visual feedback animation
    const tl = gsap.timeline();
    tl.to(".map-overlay", { opacity: 0.8, backgroundColor: "#000", duration: 0.3 })
      .to(".map-overlay", { opacity: 0.4, backgroundColor: "#d5f365", duration: 0.5, yoyo: true, repeat: 3 })
      .to(".map-overlay", { opacity: 0, duration: 0.3 });
    
    navigator.geolocation.getCurrentPosition((pos) => {
      // Artificial delay to allow animation to play and feel like "calculating"
      setTimeout(() => {
        const { latitude, longitude } = pos.coords;
        let closestIdx = 0;
        let minDist = Infinity;
        
        LOCATIONS.forEach((loc, idx) => {
          const d = Math.sqrt(Math.pow(loc.lat - latitude, 2) + Math.pow(loc.lng - longitude, 2));
          if (d < minDist) {
            minDist = d;
            closestIdx = idx;
          }
        });
        
        setIsFinding(false);
        
        if (closestIdx !== activeIndex) {
          changeLocation(closestIdx);
        } else {
           // Provide feedback if already at nearest
           gsap.fromTo(containerRef.current, { x: -5 }, { x: 5, duration: 0.1, repeat: 5, yoyo: true });
        }
      }, 2000);
    }, (err) => {
       console.error(err);
       setIsFinding(false);
       gsap.to(".map-overlay", { opacity: 0 });
       alert(t('locations.location_blocked'));
    });
  };

  const ChevronPrev = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const ChevronNext = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen pt-24 pb-12 bg-[#050505] relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Section className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4">
           <div className="text-center md:text-left rtl:md:text-right w-full md:w-auto">
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('locations.title')}</h1>
             <p className="text-neutral-400 max-w-xl">{t('locations.subtitle')}</p>
           </div>
           
           <div className="flex items-center gap-4 mt-6 md:mt-0 justify-center w-full md:w-auto">
              <Button variant="outline" size="sm" onClick={findNearest} className="hidden md:flex" disabled={isFinding}>
                 {isFinding ? (
                    <><Loader2 size={16} className="mr-2 animate-spin" /> {t('locations.calculating')}</>
                 ) : (
                    <><LocateFixed size={16} className="mr-2" /> {t('locations.finder_btn')}</>
                 )}
              </Button>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={prevLocation}
                   className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-500/50 transition-all active:scale-95"
                 >
                    <ChevronPrev size={24} />
                 </button>
                 <div className="flex gap-1.5 mx-2">
                    {LOCATIONS.map((_, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => changeLocation(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? 'w-8 bg-brand-500' : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'}`}
                      ></div>
                    ))}
                 </div>
                 <button 
                   onClick={nextLocation}
                   className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-500/50 transition-all active:scale-95"
                 >
                    <ChevronNext size={24} />
                 </button>
              </div>
           </div>
        </div>

        {/* 
            Mobile Layout: Flex column, huge map height.
            Desktop Layout: Grid 12 cols, fixed 600px height.
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:h-[600px] relative">
          
          {/* Map Container - Takes up more space on mobile (80vh) */}
          <div className="lg:col-span-8 h-[80vh] lg:h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group bg-[#111]">
             
             {/* Transition Overlay */}
             <div className="map-overlay absolute inset-0 bg-black z-20 pointer-events-none opacity-0"></div>
             
             {/* Dynamic Map Embed */}
             <div ref={mapRef} className="w-full h-full relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={`https://maps.google.com/maps?q=${activeLocation.lat},${activeLocation.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed&style=feature:all|element:all|saturation:-100|invert_lightness:true`}
                  className="grayscale hover:grayscale-0 transition-all duration-700 w-full h-full"
                  style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
                  title={activeLocation.name}
                ></iframe>
             </div>
             
             {/* Mobile Overlay Badge */}
             <div className="absolute top-4 left-4 right-4 lg:hidden z-10">
                 <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                          <MapPin className="text-brand-500" size={18} />
                          <span className="text-white font-bold">{activeLocation.name}</span>
                       </div>
                       <span className="text-[0.9375rem] text-brand-500 font-mono bg-brand-500/10 px-2 py-1 rounded">Open Now</span>
                    </div>
                 </div>
             </div>

             {/* Mobile-Only Floating Finder Button */}
             <div className="absolute bottom-6 left-4 right-4 md:hidden z-20">
                <Button 
                   size="lg" 
                   fullWidth 
                   onClick={findNearest} 
                   disabled={isFinding}
                   className="shadow-xl bg-brand-500 hover:bg-brand-400 text-black border-none"
                >
                   {isFinding ? (
                      <><Loader2 size={20} className="mr-2 animate-spin" /> {t('locations.calculating')}</>
                   ) : (
                      <><LocateFixed size={20} className="mr-2" /> {t('locations.finder_btn')}</>
                   )}
                </Button>
             </div>
          </div>

          {/* Info Panel - Interactive - Auto height on mobile */}
          <div className="lg:col-span-4 flex flex-col h-auto lg:h-full">
            <div ref={infoRef} className="glass-panel p-8 rounded-3xl flex-grow flex flex-col justify-between relative overflow-hidden min-h-[400px]">
               {/* Background Decorative */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none"></div>

               <div className="location-info-content relative z-10 h-full flex flex-col">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                       <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></div>
                       <span className="text-[0.9375rem] text-neutral-400 font-mono uppercase tracking-widest">Active Location</span>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-2">{activeLocation.name}</h2>
                    <p className="text-neutral-500 text-[0.9375rem] mb-10">Premium Service Center</p>

                    <div className="space-y-8">
                        <div>
                           <h3 className="text-brand-500 font-mono text-[0.9375rem] uppercase tracking-widest mb-3 flex items-center gap-2">
                              <MapPin size={14} /> Address
                           </h3>
                           <p className="text-xl text-white font-medium leading-relaxed">{activeLocation.addressKey}</p>
                        </div>

                        <div>
                           <h3 className="text-brand-500 font-mono text-[0.9375rem] uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Clock size={14} /> Hours
                           </h3>
                           <div className="flex justify-between text-[0.9375rem] border-b border-white/5 pb-2 mb-2">
                              <span className="text-neutral-400">Sat - Thu</span>
                              <span className="text-white text-[0.9375rem]">8:00 AM - 9:00 PM</span>
                           </div>
                           <div className="flex justify-between text-[0.9375rem]">
                              <span className="text-neutral-400">Friday</span>
                              <span className="text-white text-[0.9375rem]">2:00 PM - 9:00 PM</span>
                           </div>
                        </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8 space-y-4">
                     <Button 
                       size="xl" 
                       fullWidth 
                       className="group shadow-lg shadow-brand-500/10" 
                       onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.lat},${activeLocation.lng}`, '_blank')}
                     >
                        <Navigation className="mr-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
                        {t('locations.open_maps')}
                     </Button>
                     
                     <a href={`tel:${activeLocation.phone.replace(/\s/g, '')}`} className="block">
                        <Button variant="secondary" fullWidth className="group border-white/10 hover:bg-white/5">
                           <Phone className="mr-2 w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                           <span className="text-neutral-400 group-hover:text-white transition-colors">{activeLocation.phone}</span>
                        </Button>
                     </a>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
};