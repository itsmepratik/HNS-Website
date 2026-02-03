import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import { Calendar, CheckCircle, Car, User, Phone, Zap, Droplet } from 'lucide-react';

export const BookingForm: React.FC<{ id?: string }> = ({ id }) => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [serviceType, setServiceType] = useState<'premium' | 'standard'>('premium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div 
      id={id} 
      className="w-full rounded-2xl relative overflow-hidden flex flex-col transition-all duration-300
        bg-gradient-to-br from-white/10 to-black/60
        backdrop-blur-2xl border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        ring-1 ring-white/10"
    >
      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-80"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500/20 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="p-6 pb-4 border-b border-white/10 relative z-10 bg-black/20">
        <div className="flex items-center gap-4 mb-1">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-black shadow-lg shadow-brand-500/20 border border-brand-300/50">
             <Calendar className="w-5 h-5" />
           </div>
           <div>
             <h3 className="text-xl font-bold text-white tracking-wide">{t('booking.title')}</h3>
             <div className="flex items-center gap-2 mt-0.5">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
               <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-widest font-bold">Live Availability</p>
             </div>
           </div>
        </div>
      </div>

      <div className="p-6 pt-6 relative z-10 flex-1">
      {submitted ? (
        <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300 py-16">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <CheckCircle size={48} />
          </div>
          <h4 className="text-white font-bold text-3xl mb-3">{t('booking.success')}</h4>
          <p className="text-base text-neutral-300 max-w-[240px] leading-relaxed">Our specialized technicians are preparing for your arrival.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Service Selection Cards */}
          <div className="grid grid-cols-2 gap-4">
             <div 
               onClick={() => setServiceType('premium')}
               className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 relative overflow-hidden group flex flex-col justify-center h-28 ${serviceType === 'premium' ? 'bg-brand-500/20 border-brand-500 shadow-[0_0_20px_rgba(213,243,101,0.2)]' : 'bg-black/30 border-white/10 hover:bg-white/5 hover:border-white/20'}`}
             >
               <div className="flex justify-between items-center mb-3">
                 <Zap size={24} className={serviceType === 'premium' ? 'text-brand-500' : 'text-neutral-500'} />
                 {serviceType === 'premium' && <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_#d5f365]"></div>}
               </div>
               <p className={`text-sm font-bold tracking-wide ${serviceType === 'premium' ? 'text-white' : 'text-neutral-400'}`}>{t('booking.premium')}</p>
             </div>

             <div 
               onClick={() => setServiceType('standard')}
               className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 relative overflow-hidden group flex flex-col justify-center h-28 ${serviceType === 'standard' ? 'bg-brand-500/20 border-brand-500 shadow-[0_0_20px_rgba(213,243,101,0.2)]' : 'bg-black/30 border-white/10 hover:bg-white/5 hover:border-white/20'}`}
             >
               <div className="flex justify-between items-center mb-3">
                 <Droplet size={24} className={serviceType === 'standard' ? 'text-brand-500' : 'text-neutral-500'} />
                 {serviceType === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_#d5f365]"></div>}
               </div>
               <p className={`text-sm font-bold tracking-wide ${serviceType === 'standard' ? 'text-white' : 'text-neutral-400'}`}>{t('booking.standard')}</p>
             </div>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-neutral-500 w-5 h-5 group-focus-within:text-brand-500 transition-colors rtl:left-auto rtl:right-4" />
              <input 
                required
                id="booking-name"
                type="text" 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80 outline-none transition-all placeholder:text-neutral-600 rtl:pr-12 rtl:pl-4 focus:bg-black/60"
                placeholder={t('booking.name')}
              />
            </div>

            <div className="relative group">
              <Phone className="absolute left-4 top-3.5 text-neutral-500 w-5 h-5 group-focus-within:text-brand-500 transition-colors rtl:left-auto rtl:right-4" />
              <input 
                required
                type="tel" 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80 outline-none transition-all placeholder:text-neutral-600 rtl:pr-12 rtl:pl-4 focus:bg-black/60"
                placeholder={t('booking.phone')}
              />
            </div>

            <div className="relative group">
              <Car className="absolute left-4 top-3.5 text-neutral-500 w-5 h-5 group-focus-within:text-brand-500 transition-colors rtl:left-auto rtl:right-4" />
              <input 
                required
                type="text" 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white text-sm focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80 outline-none transition-all placeholder:text-neutral-600 rtl:pr-12 rtl:pl-4 focus:bg-black/60"
                placeholder={t('booking.vehicle')}
              />
            </div>
            
             <div className="relative group">
              <input 
                required
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80 outline-none transition-all placeholder:text-neutral-600 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100 focus:bg-black/60"
              />
            </div>
          </div>

          <Button type="submit" fullWidth size="lg" className="mt-4 shadow-[0_4px_20px_rgba(213,243,101,0.25)] hover:shadow-[0_4px_30px_rgba(213,243,101,0.4)]">
            {t('booking.submit')}
          </Button>
        </form>
      )}
      </div>
    </div>
  );
};