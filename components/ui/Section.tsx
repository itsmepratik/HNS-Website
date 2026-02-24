import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  background?: 'default' | 'darker' | 'accent';
  allowOverflow?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  className = '', 
  noPadding = false,
  background = 'default',
  allowOverflow = false
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Reset any previous state to ensure clean animation
    gsap.set(sectionRef.current, { clearProps: "all" });

    // Animate the section content when it comes into view
    gsap.fromTo(sectionRef.current, 
      { 
        y: 60, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          // Start animation when top of section hits 90% of viewport height (almost bottom)
          // This ensures it triggers earlier on the way down
          start: "top 95%", 
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: sectionRef });

  const bgClasses = {
    default: 'bg-transparent',
    darker: 'bg-neutral-900/50',
    accent: 'bg-brand-500',
  };

  return (
    <section 
      ref={sectionRef}
      id={id} 
      className={`relative w-full ${allowOverflow ? '' : 'overflow-hidden'} ${bgClasses[background]} ${noPadding ? '' : 'py-16 md:py-24'} transition-colors duration-300 ${className}`}
      // Set initial opacity to 0 via style to prevent flash before animation
      style={{ opacity: 0 }} 
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {children}
      </div>
    </section>
  );
};