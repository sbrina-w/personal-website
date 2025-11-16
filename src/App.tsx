import React, { useState, useCallback } from 'react';
import './App.css';
import './styles/global.css';

import BackgroundEffect from './components/BackgroundEffect';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { ContentSections } from './components/ContentSections';
import { Receipt } from './components/Receipt';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = useCallback((itemId: string) => {
    const element = document.getElementById(itemId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleHeroScroll = useCallback(() => {
    setMenuOpen(true);
  }, []);

  return (
    <div className="app">
      <BackgroundEffect />
      <Navigation onNavigate={handleNavigate} />
      <Hero onScroll={handleHeroScroll} />
      {menuOpen && <Menu onMenuItemClick={handleMenuItemClick} />}
      <ContentSections />
      <Receipt />
    </div>
  );
}

export default App;
