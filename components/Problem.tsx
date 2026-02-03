import React from 'react';
import { Section } from './ui/Section';
import { AlertTriangle, Droplet, XCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Problem: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Section className="border-b border-white/5">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-red-500 font-mono font-bold">
            <AlertTriangle className="w-5 h-5" />
            <span>{t('problem.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            {t('problem.title_start')} <span className="text-red-500">{t('problem.title_highlight')}</span> {t('problem.title_end')}
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            {t('problem.desc')}
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neutral-900 rounded-lg text-red-400 shrink-0">
                <XCircle size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold">{t('problem.p1_title')}</h3>
                <p className="text-sm text-neutral-400">{t('problem.p1_desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neutral-900 rounded-lg text-red-400 shrink-0">
                <XCircle size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold">{t('problem.p2_title')}</h3>
                <p className="text-sm text-neutral-400">{t('problem.p2_desc')}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-2 bg-neutral-900 rounded-lg text-red-400 shrink-0">
                <XCircle size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold">{t('problem.p3_title')}</h3>
                <p className="text-sm text-neutral-400">{t('problem.p3_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Visual comparison card */}
          <div className="glass-panel p-6 rounded-2xl relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono text-neutral-300">{t('problem.analysis')}</h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-xs text-red-500 font-mono">{t('problem.detected')}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-48 rounded-lg bg-black overflow-hidden relative border border-white/10 group">
                  <img src="https://images.unsplash.com/photo-1516550893885-3b952a22530c?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" alt="Clean Oil" />
                  <div className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2 bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded font-mono border border-emerald-500/30">
                    {t('problem.clean')}
                  </div>
                </div>
                <p className="text-xs text-center text-emerald-400 font-mono">{t('problem.viscosity_opt')}</p>
              </div>
              <div className="space-y-2">
                <div className="h-48 rounded-lg bg-black overflow-hidden relative border border-red-500/30 group">
                  <img src="https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt="Dirty Sludge" />
                  <div className="absolute bottom-2 left-2 rtl:left-auto rtl:right-2 bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded font-mono border border-red-500/30">
                    {t('problem.critical')}
                  </div>
                </div>
                <p className="text-xs text-center text-red-400 font-mono">{t('problem.viscosity_fail')}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-950/30 border border-red-900/50 rounded-lg flex items-start gap-3">
              <Droplet className="text-red-500 shrink-0 mt-1" size={20} />
              <div>
                 <p className="text-sm text-red-200 font-bold">{t('problem.alert_title')}</p>
                 <p className="text-xs text-red-300/70 mt-1">{t('problem.alert_desc')}</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
      </div>
    </Section>
  );
};