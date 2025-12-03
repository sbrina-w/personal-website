import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './styles/global.css';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BackgroundMusic } from './components/BackgroundMusic';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContentSections, aboutSection, artSection } from './components/ContentSections';
import { Receipt } from './components/Receipt';
import Gl from './gl';
import Blob from './gl/Blob';

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

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

  // Update blob color when theme changes
  useEffect(() => {
    if (Gl.scene.children.length > 0) {
      const blob = Gl.scene.children[0];
      if (blob && 'material' in blob) {
        const material = (blob as any).material;
        if (material && material.uniforms && material.uniforms.uIsDarkMode) {
          material.uniforms.uIsDarkMode.value = isDarkMode ? 1.0 : 0.0;
        }
      }
    }
  }, [isDarkMode]);

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
      <Navigation 
        onNavigate={handleNavigate} 
        isMuted={isMuted} 
        onToggleMute={handleToggleMute}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
      <Hero onScroll={handleHeroScroll} onMenuItemClick={handleMenuItemClick} />
      <ContentSections sections={aboutSection} />
      <ExperienceSection />
      <ProjectsSection />
      <ContentSections sections={artSection} />
      <Receipt />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;