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
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  className = '', 
  noPadding = false,
  background = 'default' 
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Animate the section content when it comes into view
    gsap.fromTo(sectionRef.current, 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Animation starts when top of section hits 85% of viewport height
          toggleActions: "play none none reverse" // Play on enter, reverse on leave back up
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
      className={`relative w-full ${bgClasses[background]} ${noPadding ? '' : 'py-16 md:py-24'} transition-colors duration-300 ${className}`}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {children}
      </div>
    </section>
  );
};