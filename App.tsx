import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppGlobe } from './components/WhatsAppGlobe';

// Import Pages from dedicated folders
import { HomePage } from './pages/Home/index';
import { CataloguePage } from './pages/Catalogue/index';
import { BlogPage } from './pages/Blog/index';
import { AboutPage } from './pages/About/index';
import { AIAdvisorPage } from './pages/AIAdvisor/index';
import { LocationsPage } from './pages/Locations/index';
import { LegalPage } from './pages/Legal/index';

type View = 'home' | 'catalogue' | 'ai-advisor' | 'locations' | 'about' | 'blog' | 'privacy' | 'terms' | 'warranty';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="font-sans antialiased text-neutral-200 selection:bg-brand-500/30 selection:text-brand-200 mx-auto relative">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      
      {currentView === 'home' && <HomePage />}
      
      {currentView === 'catalogue' && <CataloguePage />}

      {currentView === 'ai-advisor' && <AIAdvisorPage />}

      {currentView === 'locations' && <LocationsPage />}
      
      {currentView === 'about' && <AboutPage />}

      {currentView === 'blog' && <BlogPage />}

      {(currentView === 'privacy' || currentView === 'terms' || currentView === 'warranty') && (
        <LegalPage type={currentView} />
      )}
      
      {/* Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Floating Widget */}
      <WhatsAppGlobe />
      
    </div>
  );
};

export default App;