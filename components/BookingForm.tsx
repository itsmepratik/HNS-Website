import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/Button';
import { Calendar, CheckCircle, Car, User, Phone, Zap, Droplet, AlertCircle, Loader2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const BookingForm: React.FC<{ id?: string }> = ({ id }) => {
  const { t, formatNumber } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceType, setServiceType] = useState<'premium' | 'standard'>('premium');
  const [dateType, setDateType] = useState('text');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    date: ''
  });

  // Validation State
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    vehicle: '',
    date: ''
  });

  // Real-time Validation Logic
  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.trim().length < 3) error = t('booking.errors.name_short');
        if (!value) error = t('booking.errors.required');
        break;
      case 'phone':
        const phoneRegex = /^[\d\s\-\+]{8,}$/;
        if (!phoneRegex.test(value)) error = t('booking.errors.phone_invalid');
        if (!value) error = t('booking.errors.required');
        break;
      case 'vehicle':
        if (value.trim().length < 2) error = t('booking.errors.vehicle_short');
        if (!value) error = t('booking.errors.required');
        break;
      case 'date':
        if (!value) {
          error = t('booking.errors.required');
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) error = t('booking.errors.date_past');
        }
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Validate on change
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField('name', formData.name);
    const isPhoneValid = validateField('phone', formData.phone);
    const isVehicleValid = validateField('vehicle', formData.vehicle);
    const isDateValid = validateField('date', formData.date);

    if (isNameValid && isPhoneValid && isVehicleValid && isDateValid) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        // Reset form after delay
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', phone: '', vehicle: '', date: '' });
        }, 5000);
      }, 1500);
    }
  };

  useGSAP(() => {
    if (submitted) {
       gsap.fromTo(".success-icon", 
         { scale: 0, rotation: -180 }, 
         { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
       );
       gsap.fromTo(".success-text",
         { y: 20, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.5, delay: 0.3, stagger: 0.1 }
       );
    }
  }, [submitted]);

  return (
    <div 
      id={id} 
      className="w-full rounded-2xl relative overflow-hidden flex flex-col
        bg-gradient-to-br from-white/10 to-black/80
        backdrop-blur-2xl border border-white/20
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        ring-1 ring-white/10 min-h-[580px]"
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

      <div className="p-6 pt-6 relative z-10 flex-1 flex flex-col">
      {submitted ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="success-icon w-28 h-28 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <CheckCircle size={56} />
          </div>
          <h4 className="success-text text-white font-bold text-3xl mb-4">{t('booking.success')}</h4>
          <p className="success-text text-lg text-neutral-300 max-w-[280px] leading-relaxed mb-8">{t('booking.success_sub')}</p>
          <div className="success-text w-full max-w-xs bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                <Phone size={18} />
             </div>
             <div className="text-left">
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">SMS Confirmation</p>
                <p className="text-sm text-white">Sent to {formatNumber(formData.phone)}</p>
             </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 h-full flex flex-col">
          
          {/* Service Selection Cards - REMOVED PRICES */}
          <div className="grid grid-cols-2 gap-4">
             <div 
               onClick={() => setServiceType('premium')}
               className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 relative overflow-hidden group flex flex-col justify-center h-24 ${serviceType === 'premium' ? 'bg-brand-500/20 border-brand-500 shadow-[0_0_20px_rgba(213,243,101,0.2)]' : 'bg-black/30 border-white/10 hover:bg-white/5 hover:border-white/20'}`}
             >
               <div className="flex justify-between items-center mb-3">
                 <Zap size={24} className={serviceType === 'premium' ? 'text-brand-500' : 'text-neutral-500'} />
                 {serviceType === 'premium' && <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_#d5f365]"></div>}
               </div>
               <p className={`text-sm font-bold tracking-wide ${serviceType === 'premium' ? 'text-white' : 'text-neutral-400'}`}>{t('booking.premium')}</p>
             </div>

             <div 
               onClick={() => setServiceType('standard')}
               className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 relative overflow-hidden group flex flex-col justify-center h-24 ${serviceType === 'standard' ? 'bg-brand-500/20 border-brand-500 shadow-[0_0_20px_rgba(213,243,101,0.2)]' : 'bg-black/30 border-white/10 hover:bg-white/5 hover:border-white/20'}`}
             >
               <div className="flex justify-between items-center mb-3">
                 <Droplet size={24} className={serviceType === 'standard' ? 'text-brand-500' : 'text-neutral-500'} />
                 {serviceType === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_8px_#d5f365]"></div>}
               </div>
               <p className={`text-sm font-bold tracking-wide ${serviceType === 'standard' ? 'text-white' : 'text-neutral-400'}`}>{t('booking.standard')}</p>
             </div>
          </div>

          <div className="space-y-4 flex-grow">
            <div className="relative group">
              <User className={`absolute left-4 top-3.5 w-5 h-5 transition-colors rtl:left-auto rtl:right-4 ${errors.name ? 'text-red-500' : 'text-neutral-500 group-focus-within:text-brand-500'}`} />
              <input 
                id="booking-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text" 
                className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3.5 text-white text-sm outline-none transition-all placeholder:text-neutral-600 rtl:pr-12 rtl:pl-4 focus:bg-black/60 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80'}`}
                placeholder={t('booking.name')}
              />
              {errors.name && <div className="absolute right-3 top-3.5 rtl:right-auto rtl:left-3 text-red-500 animate-pulse"><AlertCircle size={16} /></div>}
              {errors.name && <p className="text-xs text-red-500 mt-1 ml-2">{errors.name}</p>}
            </div>

            <div className="relative group">
              <Phone className={`absolute left-4 top-3.5 w-5 h-5 transition-colors rtl:left-auto rtl:right-4 ${errors.phone ? 'text-red-500' : 'text-neutral-500 group-focus-within:text-brand-500'}`} />
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                type="tel" 
                className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3.5 text-white text-sm outline-none transition-all placeholder:text-neutral-600 rtl:pr-12 rtl:pl-4 focus:bg-black/60 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80'}`}
                placeholder={t('booking.phone')}
              />
               {errors.phone && <div className="absolute right-3 top-3.5 rtl:right-auto rtl:left-3 text-red-500 animate-pulse"><AlertCircle size={16} /></div>}
               {errors.phone && <p className="text-xs text-red-500 mt-1 ml-2">{errors.phone}</p>}
            </div>

            <div className="relative group">
              <Car className={`absolute left-4 top-3.5 w-5 h-5 transition-colors rtl:left-auto rtl:right-4 ${errors.vehicle ? 'text-red-500' : 'text-neutral-500 group-focus-within:text-brand-500'}`} />
              <input 
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                type="text" 
                className={`w-full bg-black/40 border rounded-xl pl-12 pr-4 py-3.5 text-white text-sm outline-none transition-all placeholder:text-neutral-600 rtl:pr-12 rtl:pl-4 focus:bg-black/60 ${errors.vehicle ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80'}`}
                placeholder={t('booking.vehicle')}
              />
              {errors.vehicle && <div className="absolute right-3 top-3.5 rtl:right-auto rtl:left-3 text-red-500 animate-pulse"><AlertCircle size={16} /></div>}
              {errors.vehicle && <p className="text-xs text-red-500 mt-1 ml-2">{errors.vehicle}</p>}
            </div>
            
             <div className="relative group">
              <input 
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                onFocus={() => setDateType('date')}
                onBlur={(e) => !e.target.value && setDateType('text')}
                type={dateType}
                placeholder={t('booking.date')}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all placeholder:text-neutral-600 [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:hover:opacity-100 focus:bg-black/60 ${errors.date ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-brand-500/80 focus:ring-1 focus:ring-brand-500/80'}`}
              />
               {errors.date && <p className="text-xs text-red-500 mt-1 ml-2">{errors.date}</p>}
            </div>
          </div>

          <Button type="submit" fullWidth size="lg" disabled={loading} className="mt-4 shadow-[0_4px_20px_rgba(213,243,101,0.25)] hover:shadow-[0_4px_30px_rgba(213,243,101,0.4)]">
            {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : t('booking.submit')}
          </Button>
        </form>
      )}
      </div>
    </div>
  );
};