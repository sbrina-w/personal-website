import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './styles/global.css';

import { BackgroundMusic } from './components/BackgroundMusic';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContentSections } from './components/ContentSections';
import { Receipt } from './components/Receipt';
import Gl from './gl';
import Blob from './gl/Blob';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // size, speed, color, density, strength, offset
    const blob = new Blob(10, 0.15, 1.0, 2.0, 0.3, Math.PI * 2);
    
    blob.position.set(-3, -2, 2);
    
    Gl.scene.add(blob);

    return () => {
      Gl.scene.remove(blob);
      blob.geometry.dispose();
      blob.material.dispose();
    };
  }, []);

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

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return (
    <div className="app">
      <BackgroundMusic isMuted={isMuted} />
      <Navigation onNavigate={handleNavigate} isMuted={isMuted} onToggleMute={handleToggleMute} />
      <Hero onScroll={handleHeroScroll} />
      {menuOpen && <Menu onMenuItemClick={handleMenuItemClick} />}
      <ExperienceSection />
      <ProjectsSection />
      <ContentSections />
      <Receipt />
    </div>
  );
}

export default App;