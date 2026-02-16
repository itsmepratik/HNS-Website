
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppGlobe } from './components/WhatsAppGlobe';

// Import Pages (using relative paths to the previous component files which are now effectively Page wrappers in the new structure)
// Note: In a real migration we would update imports to match the new file structure. 
// For this XML output, I am pointing to the new Page components defined above.
import { HomePage } from './pages/Home/index';
import { CataloguePage } from './pages/Catalogue/index';
import { BlogPage } from './pages/Blog/index';
import { About } from './components/About'; // Keeping as component for now as per minimal change strategy unless moved
import { AIRecommendation } from './components/AIRecommendation';
import { Locations } from './components/Locations';
import { Legal } from './components/Legal';

type View = 'home' | 'catalogue' | 'ai-advisor' | 'locations' | 'about' | 'blog' | 'privacy' | 'terms' | 'warranty';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="font-sans antialiased text-neutral-200 selection:bg-brand-500/30 selection:text-brand-200 mx-auto relative">
      <Navbar onNavigate={setCurrentView} currentView={currentView} />
      
      {currentView === 'home' && <HomePage />}
      
      {currentView === 'catalogue' && <CataloguePage />}

      {currentView === 'ai-advisor' && <AIRecommendation />}

      {currentView === 'locations' && <Locations />}
      
      {currentView === 'about' && <About />}

      {currentView === 'blog' && <BlogPage />}

      {(currentView === 'privacy' || currentView === 'terms' || currentView === 'warranty') && (
        <Legal type={currentView} />
      )}
      
      {/* Footer */}
      <Footer onNavigate={setCurrentView} />

      {/* Floating Widget */}
      <WhatsAppGlobe />
      
    </div>
  );
};

export default App;
