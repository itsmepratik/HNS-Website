import React, { useEffect } from 'react';
import { Hero } from '../../components/Hero';
import { Brands } from '../../components/Brands';
import { Problem } from '../../components/Problem';
import { Solution } from '../../components/Solution';
import { Services } from '../../components/Services';
import { Authority } from '../../components/Authority';
import { Offer } from '../../components/Offer';
import { Warning } from '../../components/Warning';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const HomePage: React.FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger to ensure positions are calculated correctly after mount
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  return (
    <div className="home-page-container">
      {/* 1. Get Attention & Booking */}
      <Hero />
      
      {/* 2. Brand Trust */}
      <Brands />
      
      {/* 3. Identify the Problem */}
      <Problem />
      
      {/* 4. Provide the Solution */}
      <Solution />

      {/* 5. Core Services - New Component */}
      <Services />
      
      {/* 6. Present Credentials, Benefits, Social Proof */}
      <Authority />
      
      {/* 7. Make Your Offer */}
      <Offer />
      
      {/* 8. Warning */}
      <Warning />
    </div>
  );
};