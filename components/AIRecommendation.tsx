import React, { useState, useMemo } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleGenAI, Type } from "@google/genai";
import { Cpu, Thermometer, MapPin, Gauge, AlertCircle, RefreshCw, Car, Activity, Zap, CheckCircle, GripHorizontal, Wrench, AlertTriangle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomDropdown } from './ui/CustomDropdown';

export const AIRecommendation: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    location: '',
    weather: 'Hot'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookService = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const weatherOptions = [
    { value: "Hot", label: "EXTREME HEAT (>35°C)" },
    { value: "Moderate", label: "MODERATE (15°C - 30°C)" },
    { value: "Cold", label: "COLD (<10°C)" },
    { value: "Desert", label: "DESERT DUST & HEAT" }
  ];

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      if (!import.meta.env.VITE_GEMINI_API_KEY) {
         throw new Error("API Key not configured");
      }
      
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      
      const prompt = `
        Vehicle: ${formData.year} ${formData.make} ${formData.model}
        Mileage: ${formData.mileage}
        Conditions: ${formData.location}, ${formData.weather}
        
        Act as a senior automotive engineer. Provide a detailed analysis.
        
        1. Recommend the exact oil (Viscosity, Type, Grade).
        2. Identify 3 potential common maintenance issues specifically for this vehicle at this mileage and weather condition (e.g. desert dust affects filters, heat affects cooling, timing belt at 100k, etc).
        3. Suggest 3 specific services relevant to these conditions (e.g. AC Gas Top-up, Engine Flush, etc).
        
        Return JSON:
        - title: "Engine Oil Recommendation for [Year] [Make] [Model]..."
        - viscosity: e.g. "5W-30"
        - oil_type: e.g. "Fully Synthetic"
        - grade: e.g. "High Mileage" (if mileage > 75000), "Performance", or "Standard"
        - reasoning: Brief technical reason for oil choice (max 20 words).
        - maintenance_tip: Brief general tip (max 20 words).
        - common_issues: Array of 3 strings (e.g. "Clogged Air Filters (Dust)", "Battery Degradation (Heat)", "Timing Belt Wear").
        - recommended_services: Array of 3 strings (e.g. "AC System Sanitization", "Coolant Flush", "Transmission Fluid Check").
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              viscosity: { type: Type.STRING },
              oil_type: { type: Type.STRING },
              grade: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              maintenance_tip: { type: Type.STRING },
              common_issues: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              recommended_services: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
            },
            required: ["title", "viscosity", "oil_type", "grade", "reasoning", "maintenance_tip", "common_issues", "recommended_services"],
          },
        },
      });

      if (response.text) {
        setResult(JSON.parse(response.text));
      } else {
        throw new Error("No response generated");
      }

    } catch (err) {
      console.error(err);
      setError("System malfunction. Unable to connect to diagnostic core. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    if (result) {
       const tl = gsap.timeline();
       tl.from(".result-dashboard", { opacity: 0, scale: 0.98, duration: 0.6, ease: "power2.out" })
         .from(".result-header", { y: -10, opacity: 0, duration: 0.4 })
         .from(".result-gauge", { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.2)" }, "-=0.2")
         .from(".result-card-item", { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, "-=0.3")
         .from(".result-list-item", { x: -10, opacity: 0, duration: 0.3, stagger: 0.05 }, "-=0.2");
    }
  }, [result]);

  // Dynamic Theme Logic
  const dynamicTheme = useMemo(() => {
    if (!result) return { 
      color: 'text-neutral-500', 
      border: 'border-white/10', 
      bg: 'bg-[#0a0a0a]', 
      shadow: 'shadow-none' 
    };
    
    const text = (result.grade + result.oil_type).toLowerCase();
    
    if (text.includes('mileage')) {
      return {
        color: 'text-amber-500',
        borderColor: 'border-amber-500',
        bgGlow: 'bg-amber-500/10',
        shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]',
        accent: 'bg-amber-500'
      };
    } else if (text.includes('performance') || text.includes('synthetic')) {
      return {
        color: 'text-brand-500',
        borderColor: 'border-brand-500',
        bgGlow: 'bg-brand-500/10',
        shadow: 'shadow-[0_0_30px_rgba(213,243,101,0.15)]',
        accent: 'bg-brand-500'
      };
    } else {
      return {
        color: 'text-blue-400',
        borderColor: 'border-blue-400',
        bgGlow: 'bg-blue-400/10',
        shadow: 'shadow-[0_0_30px_rgba(96,165,250,0.15)]',
        accent: 'bg-blue-400'
      };
    }
  }, [result]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#050505] relative overflow-hidden flex flex-col">
       {/* High-tech Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
       
       <Section className="relative z-10 flex-grow flex items-center">
         <div className="max-w-[1400px] mx-auto w-full">
           <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded border border-brand-500/40 bg-brand-500/5 text-brand-500 text-[0.9375rem] font-mono tracking-[0.2em] uppercase mb-6 shadow-[0_0_20px_rgba(213,243,101,0.15)]">
                  <Activity size={14} className="animate-pulse" />
                  <span>AI Diagnostic Core V2.4</span>
              </div>
              <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white mb-4 tracking-tight leading-[1.1]">{t('ai.title')}</h1>
              <p className="text-neutral-400 text-[clamp(1rem,1.5vw,1.25rem)] max-w-2xl mx-auto leading-relaxed">{t('ai.subtitle')}</p>
           </div>

           <div className="grid lg:grid-cols-12 gap-8 items-start">
             {/* LEFT COLUMN: Input Console */}
             <div className="lg:col-span-5 flex flex-col h-full">
               <div className="glass-panel border border-white/10 bg-[#0a0a0a] rounded-xl overflow-hidden shadow-2xl h-full flex flex-col">
                 <div className="bg-[#111] border-b border-white/5 p-4 flex justify-between items-center">
                    <span className="text-[0.9375rem] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                       <GripHorizontal size={14} /> Telemetry Input
                    </span>
                    <div className="flex gap-1.5">
                       <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                       <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                       <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                    </div>
                 </div>
                 
                 <div className="p-6 flex-grow">
                   <form onSubmit={handleAnalyze} className="space-y-6 h-full flex flex-col">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="group">
                          <label className="text-[0.9375rem] text-brand-500 font-mono uppercase mb-1.5 block tracking-wider">{t('ai.make')}</label>
                          <input required name="make" value={formData.make} onChange={handleInputChange} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-[0.9375rem] focus:border-brand-500 focus:bg-brand-500/5 outline-none transition-all font-mono" placeholder="TOYOTA" />
                        </div>
                        <div className="group">
                          <label className="text-[0.9375rem] text-brand-500 font-mono uppercase mb-1.5 block tracking-wider">{t('ai.model')}</label>
                          <input required name="model" value={formData.model} onChange={handleInputChange} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-[0.9375rem] focus:border-brand-500 focus:bg-brand-500/5 outline-none transition-all font-mono" placeholder="CAMRY" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-5">
                        <div className="group">
                          <label className="text-[0.9375rem] text-brand-500 font-mono uppercase mb-1.5 block tracking-wider">{t('ai.year')}</label>
                          <input required type="number" name="year" value={formData.year} onChange={handleInputChange} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-[0.9375rem] focus:border-brand-500 focus:bg-brand-500/5 outline-none transition-all font-mono" placeholder="2023" />
                        </div>
                        <div className="group">
                          <label className="text-[0.9375rem] text-brand-500 font-mono uppercase mb-1.5 block tracking-wider">{t('ai.mileage')}</label>
                          <input required name="mileage" value={formData.mileage} onChange={handleInputChange} className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white text-[0.9375rem] focus:border-brand-500 focus:bg-brand-500/5 outline-none transition-all font-mono" placeholder="45000" />
                        </div>
                      </div>

                      <div className="group">
                        <label className="text-[0.9375rem] text-brand-500 font-mono uppercase mb-1.5 block tracking-wider">{t('ai.location')}</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-3.5 text-neutral-600 w-4 h-4" />
                          <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-[#151515] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-[0.9375rem] focus:border-brand-500 focus:bg-brand-500/5 outline-none transition-all font-mono" placeholder="OMAN, SOHAR" />
                        </div>
                      </div>

                      <div className="group z-50">
                        <label className="text-[0.9375rem] text-brand-500 font-mono uppercase mb-1.5 block tracking-wider">{t('ai.weather')}</label>
                        <CustomDropdown
                           options={weatherOptions}
                           value={formData.weather}
                           onChange={(val) => setFormData(prev => ({ ...prev, weather: val }))}
                           placeholder="Select Weather"
                           icon={<Thermometer className="w-4 h-4" />}
                        />
                      </div>

                      <div className="pt-4 mt-auto">
                        <Button type="submit" fullWidth disabled={loading} className="relative overflow-hidden group bg-brand-500 hover:bg-brand-400 text-black border-none py-4 shadow-[0_0_20px_rgba(213,243,101,0.2)]">
                            {loading ? (
                            <span className="flex items-center gap-2 font-mono uppercase tracking-widest text-[0.9375rem] font-bold">
                                <RefreshCw className="animate-spin w-4 h-4" /> {t('ai.analyzing')}
                            </span>
                            ) : (
                            <span className="flex items-center gap-2 font-mono uppercase tracking-widest text-[0.9375rem] font-bold">
                                <Cpu className="w-4 h-4" /> {t('ai.analyze')}
                            </span>
                            )}
                            {loading && <div className="absolute top-0 left-0 w-full h-1 bg-black/20 animate-[scan_2s_linear_infinite]" />}
                        </Button>
                      </div>
                   </form>
                 </div>
               </div>
             </div>

             {/* RIGHT COLUMN: Output Monitor (Dashboard) */}
             <div className="lg:col-span-7 h-full">
                <div className={`h-full bg-[#0a0a0a] border rounded-xl p-1 relative overflow-hidden transition-all duration-700 ${result ? dynamicTheme.borderColor + ' ' + dynamicTheme.shadow : 'border-white/10'}`}>
                   
                   {/* Ambient Lighting Background */}
                   {result && (
                      <div className={`absolute inset-0 ${dynamicTheme.bgGlow} blur-3xl transition-all duration-1000 opacity-20`}></div>
                   )}
                   
                   {/* Monitor Bezel/Scanlines */}
                   <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-lg m-1 z-20"></div>
                   
                   {result ? (
                      <div className="result-dashboard h-full p-8 flex flex-col gap-6 relative z-10">
                         {/* Header */}
                         <div className="result-header flex justify-between items-start border-b border-white/10 pb-6">
                            <div className="space-y-2">
                               <h3 className={`${dynamicTheme.color} font-mono text-[0.9375rem] uppercase tracking-[0.2em] flex items-center gap-2`}>
                                  <CheckCircle size={14} /> Analysis Complete
                               </h3>
                               <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-white leading-tight max-w-lg">
                                  {result.title}
                               </h2>
                            </div>
                            <div className="text-right shrink-0">
                               <p className="text-[0.9375rem] text-neutral-500 font-mono uppercase tracking-wider mb-1">{t('ai.confidence')}</p>
                               <div className="flex items-center justify-end gap-2">
                                  <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                     <div className={`w-[98%] h-full ${dynamicTheme.accent}`}></div>
                                  </div>
                                  <span className={`${dynamicTheme.color} font-mono text-[0.9375rem] font-bold`}>98%</span>
                               </div>
                            </div>
                         </div>

                         {/* Main Gauge */}
                         <div className="result-gauge flex items-center justify-center py-2 relative min-h-[160px]">
                            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 ${dynamicTheme.accent} blur-[100px] opacity-20 rounded-full`}></div>
                            <div className="relative w-40 h-40 flex items-center justify-center">
                               <div className="absolute inset-0 border border-dashed border-white/20 rounded-full"></div>
                               <div className={`absolute inset-2 border-2 border-dashed ${dynamicTheme.borderColor} rounded-full animate-[spin_20s_linear_infinite] opacity-50`}></div>
                               <div className="text-center z-10 flex flex-col items-center justify-center">
                                  <span className="text-3xl font-bold text-white tracking-tighter mb-1 drop-shadow-2xl">{result.viscosity}</span>
                                  <span className="text-[0.9375rem] text-white font-medium mb-1">{result.oil_type}</span>
                                  <span className={`text-[0.9375rem] font-bold uppercase tracking-wider ${dynamicTheme.color}`}>{result.grade}</span>
                               </div>
                            </div>
                         </div>

                         {/* Info Grid - Tech Analysis & Maintenance */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="result-card-item bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-lg p-5 group hover:border-white/20 transition-colors">
                               <h4 className="text-[0.9375rem] font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                  <Activity size={14} className="text-blue-500" /> Technical Analysis
                               </h4>
                               <p className="text-[0.9375rem] text-neutral-300 leading-relaxed font-light">
                                  {result.reasoning}
                               </p>
                            </div>

                            <div className="result-card-item bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-lg p-5 group hover:border-white/20 transition-colors">
                               <h4 className="text-[0.9375rem] font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                  <Zap size={14} className={dynamicTheme.color} /> Maintenance Directive
                               </h4>
                               <p className="text-[0.9375rem] text-neutral-300 leading-relaxed font-light">
                                  {result.maintenance_tip}
                               </p>
                            </div>
                         </div>

                         {/* Common Issues & Recommended Services */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-auto">
                            {result.common_issues && (
                              <div className="result-card-item bg-red-950/10 border border-red-500/20 rounded-lg p-5">
                                 <h4 className="text-[0.9375rem] font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <AlertTriangle size={14} /> Potential Risks
                                 </h4>
                                 <ul className="space-y-2">
                                    {result.common_issues.map((issue: string, idx: number) => (
                                       <li key={idx} className="result-list-item text-[0.9375rem] text-red-200/80 flex items-start gap-2">
                                          <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0"></span> {issue}
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                            )}

                            {result.recommended_services && (
                              <div className="result-card-item bg-brand-500/5 border border-brand-500/20 rounded-lg p-5">
                                 <h4 className="text-[0.9375rem] font-bold text-brand-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Wrench size={14} /> Recommended Services
                                 </h4>
                                 <ul className="space-y-2">
                                    {result.recommended_services.map((service: string, idx: number) => (
                                       <li key={idx} className="result-list-item text-[0.9375rem] text-brand-100/80 flex items-start gap-2">
                                          <span className="w-1 h-1 rounded-full bg-brand-500 mt-1.5 shrink-0"></span> {service}
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                            )}
                         </div>

                      </div>
                   ) : (
                      <div className="h-full flex flex-col items-center justify-center text-neutral-600 space-y-6">
                         <div className="relative">
                            <Gauge size={80} className="opacity-10 dark:opacity-10 text-white" />
                            <div className="absolute top-0 left-0 w-full h-full border-t border-brand-500/10 rounded-full animate-spin"></div>
                         </div>
                         <div className="text-center max-w-xs mx-auto">
                            <p className="font-mono text-[0.9375rem] uppercase tracking-[0.2em] text-neutral-500 mb-2">System Standby</p>
                            <p className="text-[0.9375rem] text-neutral-700">Enter vehicle telemetry data to initialize diagnostic core and receive AI analysis.</p>
                         </div>
                      </div>
                   )}
                </div>
                {error && (
                   <div className="mt-4 p-4 bg-red-950/30 border border-red-500/20 rounded-lg text-red-400 text-[0.9375rem] font-mono flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                      <AlertCircle size={16} />
                      {error}
                   </div>
                )}
             </div>
           </div>
         </div>
       </Section>
    </div>
  );
};