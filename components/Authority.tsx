import React from 'react';
import { Section } from './ui/Section';
import { Award, Wrench, Star, Users, Zap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Authority: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      {/* Credentials */}
      <Section className="border-b border-white/5 relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 whitespace-pre-line">
              {t('authority.title')}
            </h2>
            <p className="text-neutral-400 mb-8">
              {t('authority.desc')}
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                <Award className="text-brand-500" />
                <div>
                  <p className="text-white font-bold">{t('authority.ase')}</p>
                  <p className="text-xs text-neutral-500">{t('authority.master')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/5">
                <Star className="text-brand-500" />
                <div>
                  <p className="text-white font-bold">{t('authority.rated')}</p>
                  <p className="text-xs text-neutral-500">{t('authority.metro')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-white font-mono mb-2">5k+</p>
              <p className="text-neutral-400 text-sm">{t('authority.stat_saved')}</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center">
              <p className="text-4xl font-bold text-white font-mono mb-2">15m</p>
              <p className="text-neutral-400 text-sm">{t('authority.stat_time')}</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl text-center col-span-2">
              <p className="text-4xl font-bold text-brand-500 font-mono mb-2">100%</p>
              <p className="text-neutral-400 text-sm">{t('authority.stat_guarantee')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section background="darker">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">{t('authority.benefits_title')}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: t('authority.b1_title'), icon: <Zap />, desc: t('authority.b1_desc') },
            { title: t('authority.b2_title'), icon: <Users />, desc: t('authority.b2_desc') },
            { title: t('authority.b3_title'), icon: <Wrench />, desc: t('authority.b3_desc') }
          ].map((benefit, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 border border-white/5 hover:border-brand-500/50 rounded-xl transition-all hover:bg-white/5">
              <div className="p-4 rounded-full bg-neutral-900 text-brand-500 mb-4 shadow-lg border border-white/5">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-neutral-400">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Social Proof */}
      <Section>
        <div className="flex flex-col items-center">
           <div className="flex -space-x-4 mb-6 rtl:space-x-reverse">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-neutral-950 overflow-hidden bg-neutral-800">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-neutral-950 bg-brand-500 flex items-center justify-center text-neutral-900 font-bold text-xs">
                +500
              </div>
           </div>
           <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
             {t('authority.proof_title')}
           </h2>
           
           <div className="grid md:grid-cols-3 gap-6 w-full">
             {[
               { name: "Sarah J.", car: "Honda Civic", text: t('authority.review1') },
               { name: "Mike T.", car: "Ford F-150", text: t('authority.review2') },
               { name: "David L.", car: "BMW 330i", text: t('authority.review3') }
             ].map((review, i) => (
                <div key={i} className="bg-neutral-900/50 border border-white/10 p-6 rounded-xl">
                  <div className="flex gap-1 text-brand-500 mb-3">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-neutral-300 italic mb-4">"{review.text}"</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white font-bold">{review.name}</p>
                      <p className="text-xs text-neutral-500">{review.car}</p>
                    </div>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </Section>
    </>
  );
};