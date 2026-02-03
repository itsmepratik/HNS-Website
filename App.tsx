import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Brands } from './components/Brands';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { Authority } from './components/Authority';
import { Offer } from './components/Offer';
import { Warning } from './components/Warning';
import { Footer } from './components/Footer';
import { Catalogue } from './components/Catalogue';
import { AIRecommendation } from './components/AIRecommendation';
import { Locations } from './components/Locations';
import { Legal } from './components/Legal';
import { WhatsAppGlobe } from './components/WhatsAppGlobe';

type View = 'home' | 'catalogue' | 'ai-advisor' | 'locations' | 'privacy' | 'terms' | 'warranty';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="font-sans antialiased text-neutral-200 selection:bg-brand-500/30 selection:text-brand-200 mx-auto relative">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      
      {currentView === 'home' && (
        <>
          {/* 1. Get Attention & Booking */}
          <Hero />
          
          {/* 2. Brand Trust */}
          <Brands />
          
          {/* 3. Identify the Problem */}
          <Problem />
          
          {/* 4. Provide the Solution */}
          <Solution />
          
          {/* 5. Present Credentials, Benefits, Social Proof */}
          <Authority />
          
          {/* 6. Make Your Offer */}
          <Offer />
          
          {/* 7. Warning */}
          <Warning />
        </>
      )}

      {currentView === 'catalogue' && (
        <Catalogue />
      )}

      {currentView === 'ai-advisor' && (
        <AIRecommendation />
      )}

      {currentView === 'locations' && (
        <Locations />
      )}

      {(currentView === 'privacy' || currentView === 'terms' || currentView === 'warranty') && (
        <Legal type={currentView} />
      )}
      
      {/* 8. Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Floating Widget */}
      <WhatsAppGlobe />
      
    </div>
  );
};

export default App;