import React, { useState, useRef, useEffect, useMemo } from "react";
import { Section } from "./ui/Section";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Droplet,
  Zap,
  Disc,
  ArrowRight,
  Settings,
  Clock,
  Repeat,
  MousePointer2,
  Cog,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { usePreloadImages } from "../lib/imageLoader";

export const Services: React.FC = () => {
  const { t, dir, formatNumber } = useLanguage();
  const [activeService, setActiveService] = useState("oil");
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Memoize services data to ensure stable references
  const services = useMemo(
    () => [
      {
        id: "oil",
        icon: <Droplet size={24} />,
        title: t("services.oil_title"),
        desc: t("services.oil_desc"),
        image:
          "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200&auto=format&fit=crop",
        specs: {
          time: formatNumber("15") + " Min",
          interval: formatNumber("5,000") + " KM",
        },
      },
      {
        id: "battery",
        icon: <Zap size={24} />,
        title: t("services.battery_title"),
        desc: t("services.battery_desc"),
        image:
          "https://images.ctfassets.net/ddla2vz1iht1/nLW7aV0MDv4g1kyzgo73R/a78fd44944b660e7242b6ffab4441938/car_battery.webp",
        specs: {
          time: formatNumber("20") + " Min",
          interval: formatNumber("2-3") + " Years",
        },
      },
      {
        id: "brake",
        icon: <Disc size={24} />,
        title: t("services.brake_title"),
        desc: t("services.brake_desc"),
        image:
          "https://www.eurosparx.co.nz/wp-content/uploads/2024/11/brake-disc-skimming-vs-replacement.jpg",
        specs: {
          time: formatNumber("45") + " Min",
          interval: formatNumber("40,000") + " KM",
        },
      },
      {
        id: "parts",
        icon: <Cog size={24} />,
        title: t("services.tire_title"),
        desc: t("services.tire_desc"),
        image:
          "https://popularautoparts.ae/wp-content/uploads/2023/08/auto-spare-parts-1170x600.jpg",
        specs: { time: "On Demand", interval: "As Needed" },
      },
    ],
    [t, formatNumber],
  );

  // Preload all service images
  const serviceImages = useMemo(() => services.map((s) => s.image), [services]);
  usePreloadImages(serviceImages);

  // Auto-play logic controlled by Viewport presence
  // Using activeService in dependency array ensures the interval resets when state changes,
  // creating a consistent 5s wait time after any change (auto or manual)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isInView && !isPaused) {
      interval = setInterval(() => {
        setActiveService((current) => {
          const currentIndex = services.findIndex((s) => s.id === current);
          // Fallback to 0 if not found to prevent breaking the cycle
          const validIndex = currentIndex === -1 ? 0 : currentIndex;
          const nextIndex = (validIndex + 1) % services.length;
          return services[nextIndex].id;
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [activeService, isPaused, isInView, services]);

  // ScrollTrigger Setup
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 70%",
        end: "bottom 20%",
        onEnter: () => {
          setIsInView(true);
          setActiveService("oil"); // Reset to first service when entering
        },
        onLeave: () => {
          setIsInView(false);
        },
        onEnterBack: () => {
          setIsInView(true);
          setActiveService("oil"); // Reset to first service when re-entering
        },
        onLeaveBack: () => {
          setIsInView(false);
        },
      });
    },
    { scope: contentRef },
  );

  // Animation when service changes
  useGSAP(
    () => {
      // Content entrance
      gsap.fromTo(
        ".service-content-text",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
      );

      // Image scale effect
      gsap.fromTo(
        ".service-image-bg",
        { scale: 1.15, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
      );

      // Spec cards pop in
      gsap.fromTo(
        ".spec-card",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.2,
          ease: "back.out(1.5)",
        },
      );

      // Progress Bar Animation
      if (progressRef.current && !isPaused && isInView) {
        gsap.fromTo(
          progressRef.current,
          { width: "0%" },
          { width: "100%", duration: 5, ease: "none" },
        );
      } else if (progressRef.current) {
        gsap.set(progressRef.current, { width: "0%" });
      }
    },
    { scope: contentRef, dependencies: [activeService, isPaused, isInView] },
  );

  const activeData =
    services.find((s) => s.id === activeService) || services[0];

  return (
    <Section className="border-b border-white/5 bg-[#030303] relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="relative z-10 mb-16 text-center md:text-start flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-brand-500 font-mono text-[0.9375rem] uppercase tracking-widest mb-4">
            <Settings size={14} className="animate-spin-slow" />
            <span>Core Maintenance Modules</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {t("services.title")}
          </h2>
          <p className="text-neutral-400 max-w-xl">{t("services.subtitle")}</p>
        </div>

        {/* Interaction Hint */}
        <div className="hidden md:flex items-center gap-2 text-[0.9375rem] text-neutral-500 font-mono">
          <MousePointer2 size={12} /> Hover to pause cycle
        </div>
      </div>

      <div
        ref={contentRef}
        className="grid lg:grid-cols-12 gap-6 lg:gap-12 min-h-[600px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left: Navigation Menu */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-3">
          {services.map((service) => {
            const isActive = activeService === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`group relative flex items-center gap-5 p-5 rounded-xl border transition-all duration-500 text-left overflow-hidden ${
                  isActive
                    ? "bg-neutral-900/80 border-brand-500/50 text-white shadow-[0_0_30px_rgba(213,243,101,0.1)]"
                    : "bg-white/5 border-white/5 text-neutral-500 hover:bg-white/10 hover:text-neutral-200 hover:border-white/10"
                }`}
              >
                {/* Active Progress Bar (Background) */}
                {isActive && (
                  <div
                    ref={progressRef}
                    className="absolute bottom-0 left-0 h-[2px] bg-brand-500 z-10"
                  ></div>
                )}

                <div
                  className={`relative z-10 p-3 rounded-lg transition-colors duration-300 ${isActive ? "bg-brand-500 text-black shadow-lg shadow-brand-500/20" : "bg-black/40 text-neutral-600 group-hover:text-neutral-400"}`}
                >
                  {/* Icon Wrapper with Animation - Conditioned hover color to prevent disappearing on active state */}
                  <div
                    className={`transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 ${isActive ? "text-black" : "group-hover:text-brand-500"}`}
                  >
                    {service.icon}
                  </div>
                </div>

                <div className="relative z-10 flex-1">
                  <span
                    className={`block font-bold text-lg tracking-wide transition-colors ${isActive ? "text-white" : "text-neutral-400 group-hover:text-white"}`}
                  >
                    {service.title}
                  </span>
                </div>

                {/* Active Indicator Arrow */}
                <div
                  className={`relative z-10 transition-all duration-300 ${isActive ? "opacity-100 translate-x-0 text-brand-500" : "opacity-0 -translate-x-4"}`}
                >
                  <ArrowRight size={20} />
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            );
          })}
        </div>

        {/* Right: Display Area (Control Panel) */}
        <div className="lg:col-span-8 relative rounded-[2rem] overflow-hidden border border-white/10 group bg-[#0a0a0a] shadow-2xl min-h-[450px] lg:min-h-0">
          {/* Scanlines Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(rgba(18,16,11,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

          {/* Image Background */}
          <div className="absolute inset-0 z-0">
            <img
              key={activeService}
              src={activeData.image}
              alt={activeData.title}
              className="service-image-bg w-full h-full object-cover object-center opacity-100 transition-opacity duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/30"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-30 h-full flex flex-col justify-between p-8 md:p-12">
            {/* Top Tech Specs Tags - Smaller on Mobile */}
            <div className="flex gap-2 md:gap-3 justify-end">
              <div className="spec-card px-2.5 py-1 md:px-4 md:py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-2 md:gap-3">
                <Clock className="w-3 h-3 md:w-4 md:h-4 text-brand-500" />
                <div>
                  <p className="text-[0.9375rem] md:text-[0.9375rem] text-neutral-500 uppercase font-mono leading-none mb-0.5 md:mb-1">
                    Duration
                  </p>
                  <p className="text-[0.9375rem] font-bold text-white leading-none">
                    {activeData.specs.time}
                  </p>
                </div>
              </div>
              <div className="spec-card px-2.5 py-1 md:px-4 md:py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex items-center gap-2 md:gap-3">
                <Repeat className="w-3 h-3 md:w-4 md:h-4 text-brand-500" />
                <div>
                  <p className="text-[0.9375rem] md:text-[0.9375rem] text-neutral-500 uppercase font-mono leading-none mb-0.5 md:mb-1">
                    Interval
                  </p>
                  <p className="text-[0.9375rem] font-bold text-white leading-none">
                    {activeData.specs.interval}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-xl mt-auto">
              {/* Smaller Text Classes */}
              <h3 className="service-content-text text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight uppercase">
                {activeData.title}
              </h3>

              <div className="service-content-text h-1 w-24 bg-brand-500 mb-6"></div>

              <p className="service-content-text text-base md:text-xl text-neutral-300 leading-relaxed font-light mb-8">
                {activeData.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
