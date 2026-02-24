import React, { useRef } from 'react';
import { Section } from '../../components/ui/Section';
import { useLanguage } from '../../contexts/LanguageContext';
import { GraduationCap, Globe, TrendingUp, Activity, Hexagon, Fingerprint, Award, ShieldCheck, Star, Quote, MapPin, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    // Header Animation
    tl.from(".about-badge", { y: -20, opacity: 0, duration: 1 })
      .from(".about-title", { y: 50, opacity: 0, duration: 1.2, skewY: 5 }, "-=0.8")
      .from(".about-subtitle", { y: 20, opacity: 0, duration: 1 }, "-=0.8");

    // Founder Reveal (ScrollTrigger)
    gsap.from(".founder-img-container", {
      scale: 0.9, 
      opacity: 0, 
      duration: 1.5, 
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".founder-section",
        start: "top 70%",
      }
    });

    gsap.from(".founder-content", {
      x: -30, 
      opacity: 0, 
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".founder-section",
        start: "top 70%",
      }
    });

    // Timeline Connector (ScrollTrigger)
    gsap.from(".timeline-line", { 
      height: 0, 
      duration: 1.5, 
      ease: "none",
      scrollTrigger: {
        trigger: ".founder-section",
        start: "center center",
      }
    });

    // Sons Cards (ScrollTrigger)
    gsap.from(".son-card", { 
      y: 50, 
      opacity: 0, 
      duration: 1, 
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".next-gen-section",
        start: "top 75%",
      }
    });
      
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-12 bg-[#020202] relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-neutral-900/50 to-[#020202] z-0"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[180px] pointer-events-none animate-pulse duration-[10s]"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none"></div>

      <Section className="relative z-10">
        
        {/* HERO HEADER */}
        <div className="max-w-5xl mx-auto text-center mb-32 relative">
           <div className="about-badge inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-[0.9375rem] font-mono tracking-[0.3em] uppercase mb-8 shadow-2xl">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_10px_#d5f365]"></span>
              Since 1993
           </div>
           <h1 className="about-title text-[clamp(3.5rem,8vw,6rem)] font-black text-white mb-8 leading-[0.9] tracking-tighter">
             THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-500 to-brand-600">HNS</span> LEGACY
           </h1>
           <p className="about-subtitle text-xl md:text-2xl text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto">
             {t('about.subtitle')}
           </p>
           
           {/* Decorative scroll line */}
           <div className="absolute left-1/2 -bottom-24 w-px h-24 bg-gradient-to-b from-brand-500/50 to-transparent -translate-x-1/2"></div>
        </div>

        {/* FOUNDER SECTION */}
        <div className="mb-32 relative founder-section">
           {/* Connecting Line to next section */}
           <div className="timeline-line absolute left-1/2 top-full w-px h-32 bg-gradient-to-b from-neutral-800 to-brand-500/20 -translate-x-1/2 z-0 hidden md:block"></div>

           <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-5 relative founder-img-container">
                 <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-brand-900/20 mix-blend-overlay z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1000&auto=format&fit=crop" 
                      alt="Mohammed Abul Hossain" 
                      className="w-full h-full object-cover opacity-90 grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105" 
                    />
                    
                    {/* Badge */}
                    <div className="absolute bottom-6 left-6 z-20">
                       <div className="px-4 py-2 bg-black/80 backdrop-blur-md border border-brand-500/30 rounded-lg">
                          <p className="text-brand-500 text-[0.9375rem] font-mono uppercase tracking-widest">The Founder</p>
                       </div>
                    </div>
                 </div>
                 
                 {/* Decorative elements behind image */}
                 <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-brand-500/30 rounded-tl-3xl pointer-events-none"></div>
                 <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b border-r border-brand-500/30 rounded-br-3xl pointer-events-none"></div>
              </div>

              <div className="md:col-span-7 founder-content">
                 <div className="flex items-center gap-4 mb-6">
                    <Hexagon className="text-brand-500" fill="currentColor" fillOpacity={0.1} size={48} />
                    <div>
                       <h3 className="text-white text-lg font-bold uppercase tracking-widest">{t('about.founder_title')}</h3>
                       <p className="text-brand-500 font-mono text-[0.9375rem] uppercase tracking-widest">Saham, Oman</p>
                    </div>
                 </div>
                 
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{t('about.founder_name')}</h2>
                 <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-transparent mb-8"></div>
                 
                 <p className="text-xl text-neutral-300 leading-relaxed font-light mb-10">
                    {t('about.founder_desc')}
                 </p>

                 <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-8">
                    {[
                      { val: "3", label: t('about.legacy_stat_1') },
                      { val: "30+", label: t('about.legacy_stat_2') },
                      { val: "1", label: t('about.legacy_stat_3') }
                    ].map((stat, i) => (
                       <div key={i}>
                          <p className="text-3xl font-black text-white mb-1 font-mono">{stat.val}</p>
                          <p className="text-[0.9375rem] text-neutral-500 uppercase tracking-wider">{stat.label}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* THE NEXT GEN */}
        <div className="relative mb-32 next-gen-section">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-4">
                 <span className="w-20 h-px bg-gradient-to-r from-transparent to-white/20"></span>
                 {t('about.next_gen_title')}
                 <span className="w-20 h-px bg-gradient-to-l from-transparent to-white/20"></span>
              </h2>
           </div>

           <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              {/* Rifat */}
              <div className="son-card group">
                 <div className="relative h-full bg-[#080808] border border-white/10 rounded-3xl p-8 hover:border-brand-500/30 transition-all duration-500 hover:-translate-y-2">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full">
                       <div className="flex justify-between items-start mb-8">
                          <div className="p-4 bg-brand-500 text-black rounded-2xl shadow-[0_0_20px_rgba(213,243,101,0.3)]">
                             <TrendingUp size={32} />
                          </div>
                          <div className="text-right">
                             <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-2">
                                <span className="text-[0.9375rem] text-brand-500 font-mono uppercase tracking-widest">Operations</span>
                             </div>
                             <p className="text-[0.9375rem] text-neutral-500 font-mono uppercase">Sohar University</p>
                          </div>
                       </div>
                       
                       <h3 className="text-3xl font-bold text-white mb-2">{t('about.rifat_name')}</h3>
                       <p className="text-brand-500 text-[0.9375rem] font-mono uppercase tracking-widest mb-6">{t('about.rifat_role')}</p>
                       
                       <p className="text-neutral-400 leading-relaxed mb-8 flex-grow">
                          {t('about.rifat_desc')}
                       </p>
                       
                       <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <Activity size={16} className="text-brand-500" />
                             <span className="text-[0.9375rem] text-neutral-500 font-mono uppercase tracking-wider">Active Leadership</span>
                          </div>
                          <Fingerprint className="text-neutral-700" size={32} strokeWidth={1} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Ashiq */}
              <div className="son-card group">
                 <div className="relative h-full bg-[#080808] border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full">
                       <div className="flex justify-between items-start mb-8">
                          <div className="p-4 bg-blue-600 text-white rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                             <Globe size={32} />
                          </div>
                          <div className="text-right">
                             <div className="inline-block px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-2">
                                <span className="text-[0.9375rem] text-blue-400 font-mono uppercase tracking-widest">Strategy</span>
                             </div>
                             <p className="text-[0.9375rem] text-neutral-500 font-mono uppercase">Spain</p>
                          </div>
                       </div>
                       
                       <h3 className="text-3xl font-bold text-white mb-2">{t('about.ashiq_name')}</h3>
                       <p className="text-blue-400 text-[0.9375rem] font-mono uppercase tracking-widest mb-6">{t('about.ashiq_role')}</p>
                       
                       <p className="text-neutral-400 leading-relaxed mb-8 flex-grow">
                          {t('about.ashiq_desc')}
                       </p>
                       
                       <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <GraduationCap size={16} className="text-blue-500" />
                             <span className="text-[0.9375rem] text-neutral-500 font-mono uppercase tracking-wider">Global Insight</span>
                          </div>
                          <Fingerprint className="text-neutral-700" size={32} strokeWidth={1} />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* VISION */}
        <div className="vision-section max-w-4xl mx-auto mb-32">
           <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900/40 p-12 text-center group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(213,243,101,0.05),transparent_60%)] group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                 <div className="w-16 h-16 mx-auto bg-brand-500/10 rounded-full flex items-center justify-center text-brand-500 mb-8 border border-brand-500/20">
                    <MapPin size={32} />
                 </div>
                 
                 <h2 className="text-4xl font-bold text-white mb-6">{t('about.vision_title')}</h2>
                 <p className="text-xl text-neutral-300 leading-relaxed mb-10">
                    {t('about.vision_desc')}
                 </p>
                 
                 <div className="flex flex-wrap justify-center gap-4">
                    {['Saham', 'Sohar', 'Muscat', 'International'].map((loc, i) => (
                       <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[0.9375rem] font-mono uppercase tracking-widest text-neutral-400 hover:text-white hover:border-brand-500/50 transition-colors cursor-default">
                          {loc}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* SOCIAL PROOF SECTION */}
        <div className="border-t border-white/5 pt-32">
            <div className="max-w-6xl mx-auto">
                {/* Logos/Awards */}
                <div className="text-center mb-20">
                    <p className="text-[0.9375rem] font-mono text-neutral-500 uppercase tracking-widest mb-8">Recognized Excellence</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                         <div className="flex flex-col items-center gap-2 group">
                            <Award size={48} className="text-white group-hover:text-brand-500 transition-colors" />
                            <span className="text-[0.9375rem] font-bold text-neutral-400">Best Service 2023</span>
                         </div>
                         <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/5">
                            <CheckCircle className="text-brand-500 w-6 h-6" />
                            <span className="text-[0.9375rem] font-bold text-neutral-400">ISO 9001 Certified</span>
                         </div>
                         <div className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/5">
                            <Star className="text-brand-500 w-6 h-6" />
                            <span className="text-[0.9375rem] font-bold text-neutral-400">5-Star Rated</span>
                         </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-6">
                     {[
                       { name: "Sarah J.", role: "Long-term Client", text: t('authority.review1') },
                       { name: "Mike T.", role: "Fleet Manager", text: t('authority.review2') },
                       { name: "David L.", role: "Car Enthusiast", text: t('authority.review3') }
                     ].map((review, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-2xl relative hover:border-brand-500/30 transition-colors">
                          <div className="absolute top-6 right-6 text-brand-500/20">
                             <Quote size={48} />
                          </div>
                          <div className="flex gap-1 text-brand-500 mb-6">
                            {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                          </div>
                          <p className="text-neutral-300 mb-6 leading-relaxed relative z-10 text-[0.9375rem]">"{review.text}"</p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold text-[0.9375rem] border border-white/10 shadow-lg">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white font-bold text-[0.9375rem]">Usage: {review.name}</p>
                              <p className="text-[0.9375rem] text-neutral-500">{review.role}</p>
                            </div>
                          </div>
                        </div>
                     ))}
                </div>
            </div>
        </div>

      </Section>
    </div>
  );
};